import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Bootstrapping Corporate Crashout...\n')

  // Check database connection
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }

  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  // Run migrations (using db push for dev, migrate deploy for prod)
  console.log('\n📦 Applying database schema...')
  try {
    await prisma.$executeRaw`SELECT 1`
    console.log('✅ Database schema ready')
  } catch (error) {
    console.error('❌ Database schema check failed:', error)
    process.exit(1)
  }

  // Ensure admin user exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@corporatecrashout.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

  console.log(`\n👤 Ensuring admin user exists (${adminEmail})...`)
  
  const passwordHash = await bcrypt.hash(adminPassword, 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'admin',
      passwordHash,
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: 'admin',
      name: 'Admin',
      tradingViewAccess: 'GRANTED',
    },
  })

  console.log(`✅ Admin user ready (ID: ${adminUser.id})`)

  // Seed default sections/lessons if none exist
  const sectionCount = await prisma.section.count()
  
  if (sectionCount === 0) {
    console.log('\n📚 Creating default content structure...')
    
    const section1 = await prisma.section.create({
      data: {
        title: 'Getting Started',
        orderIndex: 1,
        lessons: {
          create: [
            {
              title: 'Welcome to Corporate Crashout',
              description: 'Introduction to the platform and your trading journey',
              googleDriveUrl: 'https://drive.google.com/file/d/example/view',
              orderIndex: 1,
            },
          ],
        },
      },
    })

    const section2 = await prisma.section.create({
      data: {
        title: 'Trading Basics',
        orderIndex: 2,
        lessons: {
          create: [
            {
              title: 'Understanding NQ Futures',
              description: 'Learn the fundamentals of NQ futures trading',
              googleDriveUrl: 'https://drive.google.com/file/d/example/view',
              orderIndex: 1,
            },
          ],
        },
      },
    })

    console.log(`✅ Created default sections: ${section1.title}, ${section2.title}`)
  } else {
    console.log(`\n📚 Found ${sectionCount} existing sections, skipping seed`)
  }

  console.log('\n✨ Bootstrap complete!')
  console.log(`\n📝 Admin credentials:`)
  console.log(`   Email: ${adminEmail}`)
  console.log(`   Password: ${adminPassword}`)
  console.log(`\n⚠️  Remember to change the admin password after first login!`)
}

main()
  .catch((error) => {
    console.error('❌ Bootstrap failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

