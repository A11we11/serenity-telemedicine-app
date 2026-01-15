import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test patient
  const patientPassword = await bcrypt.hash('password123', 10);
  const patient = await prisma.user.upsert({
    where: { email: 'patient@test.com' },
    update: {},
    create: {
      email: 'patient@test.com',
      password: patientPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'PATIENT',
      language: 'en',
      emailVerified: true,
    },
  });

  console.log('✅ Created patient:', patient.email);

  // Create test doctor
  const doctorPassword = await bcrypt.hash('password123', 10);
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@test.com' },
    update: {},
    create: {
      email: 'doctor@test.com',
      password: doctorPassword,
      firstName: 'Sarah',
      lastName: 'Smith',
      phone: '+1234567891',
      role: 'DOCTOR',
      language: 'en',
      emailVerified: true,
    },
  });

  console.log('✅ Created doctor:', doctor.email);

  // Create doctor profile
  const doctorProfile = await prisma.doctorProfile.upsert({
    where: { userId: doctor.id },
    update: {},
    create: {
      userId: doctor.id,
      specialization: 'General Medicine',
      licenseNumber: 'MD-12345',
      biography:
        'Experienced general practitioner with 10+ years of experience.',
      yearsOfExperience: 10,
      availableSlots: {
        monday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        thursday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
        friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      },
    },
  });

  console.log('✅ Created doctor profile');

  // Create sample consultation
  const consultation = await prisma.consultation.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      status: 'IN_PROGRESS',
      priority: 'normal',
      chiefComplaint: 'Persistent headache for 3 days',
      symptoms: ['headache', 'nausea', 'sensitivity to light'],
      duration: '3 days',
      medicalHistory: {
        conditions: ['migraine history'],
        surgeries: [],
        familyHistory: ['hypertension'],
      },
      medications: [
        {
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'as needed',
        },
      ],
      allergies: [],
      vitalSigns: {
        temperature: 98.6,
        bloodPressure: '120/80',
        heartRate: 72,
        weight: 70,
      },
    },
  });

  console.log('✅ Created sample consultation:', consultation.id);

  // Create sample messages
  const message1 = await prisma.message.create({
    data: {
      consultationId: consultation.id,
      senderId: patient.id,
      type: 'TEXT',
      content: 'Hello Dr. Smith, I have been experiencing severe headaches.',
    },
  });

  const message2 = await prisma.message.create({
    data: {
      consultationId: consultation.id,
      senderId: doctor.id,
      type: 'TEXT',
      content:
        'Hello John, I have reviewed your case. Can you tell me more about when the headaches occur?',
    },
  });

  console.log('✅ Created sample messages');

  // Create another patient
  const patient2Password = await bcrypt.hash('password123', 10);
  const patient2 = await prisma.user.upsert({
    where: { email: 'jane@test.com' },
    update: {},
    create: {
      email: 'jane@test.com',
      password: patient2Password,
      firstName: 'Jane',
      lastName: 'Wilson',
      phone: '+1234567892',
      role: 'PATIENT',
      language: 'en',
      emailVerified: true,
    },
  });

  console.log('✅ Created second patient:', patient2.email);

  console.log('🎉 Seed completed successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Patient: patient@test.com / password123');
  console.log('Doctor: doctor@test.com / password123');
  console.log('Patient 2: jane@test.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Add to package.json:
// "prisma": {
//   "seed": "ts-node prisma/seed.ts"
// }
