import { faker } from '@faker-js/faker';
import { input, select } from '@inquirer/prompts';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  let running = true;

  while (running) {
    const action = await select({
      message: 'Select an action:',
      choices: [
        { name: 'Add Users', value: 'add_users' },
        { name: 'Add Events', value: 'add_events' },
        { name: 'Add Super Admin', value: 'add_super_admin' },
        { name: 'Add User', value: 'add_user' },
        { name: 'Add Security Person', value: 'add_security_person' },
        { name: 'Exit', value: 'exit' },
      ],
    });

    switch (action) {
      case 'add_users':
        await addUsers();
        break;
      case 'add_events':
        await addEvents();
        break;
      case 'add_super_admin':
        await addSuperAdmin();
        break;
      case 'add_user':
        await addUser();
        break;
      case 'add_security_person':
        await addSecurityPerson();
        break;

      case 'exit':
        console.log('Exiting...');
        running = false;
        break;

      default:
        console.log('Invalid option. Please try again.');
    }
  }

  await prisma.$disconnect();
}

async function addUsers() {
  const userCount = await input({
    message: 'How many users do you want to add?',
    validate: (value) =>
      isNaN(Number(value)) ? 'Please enter a valid number' : true,
  });

  const role = (await select({
    message: 'Select a role for these users:',
    choices: [
      { name: 'Admin', value: 'ADMIN' },
      { name: 'User', value: 'USER' },
      { name: 'Security', value: 'SECURITY' },
      { name: 'Super Admin', value: 'SUPER_ADMIN' },
    ],
  })) as Role;

  const password = 'Pass@123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const users = [];
  for (let i = 0; i < Number(userCount); i++) {
    const user = await prisma.user.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        middle_name: faker.person.middleName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role,
      },
    });
    users.push(user);
  }

  console.log(`${users.length} users created with role ${role}.`);
}

async function addEvents() {
  const eventCount = await input({
    message: 'How many events do you want to add?',
    validate: (value) =>
      isNaN(Number(value)) ? 'Please enter a valid number' : true,
  });

  const events = [];
  for (let i = 0; i < Number(eventCount); i++) {
    // Generate a random number between 5 and 10
    const randomUserCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    // Fetch users with the role 'USER'
    const userIDs = await prisma.user
      .findMany({
        where: { role: 'USER' },
        take: randomUserCount,
      })
      .then((users) => users.map((user) => user.id));

    // Ensure we have enough users to connect
    if (userIDs.length === 0) {
      console.log(
        "No users with the 'USER' role found. Skipping event creation.",
      );
      continue;
    }

    // Fetch users with the role 'SECURITY'
    const securityIDs = await prisma.user
      .findMany({
        where: { role: 'SECURITY' },
        take: 3, // Adjust based on security personnel required per event
      })
      .then((users) => users.map((user) => user.id));

    // Ensure there are security personnel available
    if (securityIDs.length === 0) {
      console.log('No security personnel found. Skipping event creation.');
      continue;
    }

    // Fetch an admin user to connect to the event
    const adminUser = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (!adminUser) {
      console.log('No admin user found. Skipping event creation.');
      continue;
    }

    // Create the event and connect users and security personnel
    const event = await prisma.event.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        location: faker.location.streetAddress(),
        user: {
          connect: {
            id: adminUser.id,
          },
        },
        checkPoints: {
          createMany: {
            data: [
              { name: 'Checkpoint 1' },
              { name: 'Checkpoint 2' },
              { name: 'Checkpoint 3' },
            ],
          },
        },
      },
    });
    for (const userID of userIDs) {
      await prisma.registeredEvent.create({
        data: {
          user: {
            connect: {
              id: userID,
            },
          },
          event: {
            connect: {
              id: event.id,
            },
          },
        },
      });
    }

    for (const securityID of securityIDs) {
      await prisma.eventSecurityAssignment.create({
        data: {
          user: {
            connect: {
              id: securityID,
            },
          },
          event: {
            connect: {
              id: event.id,
            },
          },
        },
      });
    }

    events.push(event);
    console.log(
      `Event "${event.title}" created with ${userIDs.length} registered users and ${securityIDs.length} security personnel.`,
    );
  }

  console.log(`${events.length} events created.`);
}

async function addSuperAdmin() {
  const email = 'sa@gmail.com';
  const password = 'Pass@123';
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      first_name: 'Super',
      last_name: 'Admin',
      middle_name: 'Admin',
      email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Super Admin created.');
}

async function addUser() {
  const email = 'user@gmail.com';

  const password = 'Pass@123';

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      middle_name: faker.person.middleName(),
      email,
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log(`User created with email ${email}.`);
}

async function addSecurityPerson() {
  const email = 'sec1@gmail.com';
  const password = 'Pass@123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: 'Security',
      last_name: 'Person',
      middle_name: 'Person',
      email,
      password: hashedPassword,
      role: 'SECURITY',
    },
  });

  console.log(`Security Person created with email ${email}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
