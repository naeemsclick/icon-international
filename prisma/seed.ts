import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Icon International Database Seeding...');

  const adminPasswordHash = await bcrypt.hash('AdminPassword2026!', 10);
  const investorPasswordHash = await bcrypt.hash('InvestorPassword2026!', 10);

  // 1. Create Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@iconinternational.net' },
    update: {},
    create: {
      userCode: 'ICON-ADM-001',
      email: 'admin@iconinternational.net',
      name: 'Executive Super Admin',
      phone: '+968 7272 4934',
      passwordHash: adminPasswordHash,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
  });

  // 2. Create Staff Users
  const investmentManager = await prisma.user.upsert({
    where: { email: 'investment@iconinternational.net' },
    update: {},
    create: {
      userCode: 'ICON-STF-002',
      email: 'investment@iconinternational.net',
      name: 'Tariq Al-Mansoor',
      phone: '+968 9826 0202',
      passwordHash: adminPasswordHash,
      role: 'INVESTMENT_MANAGER',
      status: 'ACTIVE',
    },
  });

  // 3. Create Investor Account & Profile
  const investorUser = await prisma.user.upsert({
    where: { email: 'investor@iconinternational.net' },
    update: {},
    create: {
      userCode: 'ICON-INV-1001',
      email: 'investor@iconinternational.net',
      name: 'Sheikh Hamdan Al-Busaidi',
      phone: '+968 9123 4567',
      passwordHash: investorPasswordHash,
      role: 'INVESTOR',
      status: 'ACTIVE',
    },
  });

  const investorProfile = await prisma.investorProfile.upsert({
    where: { userId: investorUser.id },
    update: {},
    create: {
      userId: investorUser.id,
      investorCode: 'ICON-INV-1001',
      passportNumber: 'OM-P98765432',
      nationalId: '1098273645',
      address: 'Way 2314, Qurum, Muscat, Sultanate of Oman',
      nominees: {
        create: [
          {
            fullName: 'Fatima Al-Busaidi',
            relation: 'Spouse',
            phone: '+968 9123 4568',
            email: 'fatima@example.com',
            nationalIdPassport: 'OM-P98765433',
          },
        ],
      },
    },
  });

  // 4. Create Offices
  await prisma.office.deleteMany({});
  await prisma.office.createMany({
    data: [
      {
        name: 'Oman Office',
        country: 'Oman',
        address: 'As Saadah-602, Salalah, Sultanate of Oman',
        phone: '+968 7272 4934',
        whatsapp: '+968 9826 0202',
        email: 'info@iconinternational.net',
        latitude: 17.0152,
        longitude: 54.0924,
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        workingHours: 'Sun - Thu: 8:00 AM - 5:00 PM',
        isActive: true,
        isMain: true,
        sortOrder: 1,
      },
      {
        name: 'Bangladesh Office',
        country: 'Bangladesh',
        address: 'Block K, Road 16, House 295, South Banasree, Dhaka, Bangladesh',
        phone: '+880 1711 000000',
        whatsapp: '+968 9826 0202',
        email: 'dhaka@iconinternational.net',
        latitude: 23.7644,
        longitude: 90.4358,
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        workingHours: 'Sat - Thu: 9:00 AM - 6:00 PM',
        isActive: true,
        isMain: false,
        sortOrder: 2,
      },
      {
        name: 'Makkah Corporate Office',
        country: 'Saudi Arabia',
        address: 'Al Shoqiyah District, Executive Towers, Makkah Al-Mukarramah, Saudi Arabia',
        phone: '+966 12 500 0000',
        whatsapp: '+968 9826 0202',
        email: 'makkah@iconinternational.net',
        latitude: 21.3891,
        longitude: 39.8579,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        workingHours: 'Sun - Thu: 9:00 AM - 6:00 PM',
        isActive: true,
        isMain: false,
        sortOrder: 3,
      },
      {
        name: 'UK Representation',
        country: 'United Kingdom',
        address: 'Level 18, 40 Bank Street, Canary Wharf, London E14 5NR, United Kingdom',
        phone: '+44 20 7946 0990',
        whatsapp: '+968 9826 0202',
        email: 'uk@iconinternational.net',
        latitude: 51.5045,
        longitude: -0.0195,
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        workingHours: 'Mon - Fri: 9:00 AM - 5:00 PM',
        isActive: true,
        isMain: false,
        sortOrder: 4,
      },
      {
        name: 'USA Representation',
        country: 'United States',
        address: 'Suite 4200, 1 Wall Street, New York, NY 10005, United States',
        phone: '+1 212 555 0199',
        whatsapp: '+968 9826 0202',
        email: 'usa@iconinternational.net',
        latitude: 40.7074,
        longitude: -74.0113,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        workingHours: 'Mon - Fri: 9:00 AM - 5:00 PM',
        isActive: true,
        isMain: false,
        sortOrder: 5,
      },
    ],
  });

  // 5. Create Real Estate Projects with Multilingual Content
  const projectMakkah = await prisma.project.upsert({
    where: { slug: 'icon-tower-makkah' },
    update: {},
    create: {
      slug: 'icon-tower-makkah',
      status: 'UNDER_CONSTRUCTION',
      country: 'Saudi Arabia',
      city: 'Makkah Al-Mukarramah',
      location: 'Ajyad District (800m from Haram Al-Sharif)',
      latitude: 21.4187,
      longitude: 39.8262,
      propertyType: 'HOTEL',
      investmentType: 'SHARE',
      startingPrice: 350000,
      currency: 'SAR',
      cashAvailable: true,
      installmentAvailable: true,
      featured: true,
      isPublic: true,
      expectedCompletion: 'Q4 2027',
      translations: {
        create: [
          {
            language: 'en',
            name: 'Icon Tower Makkah',
            shortDescription: 'Luxury 5-Star Hotel Apartment Tower with direct Haram shuttle & perpetual yield options.',
            description: 'Icon Tower Makkah is a state-of-the-art 32-story hospitality landmark situated in the prestigious Ajyad district. Offering fractional ownership and high-yielding hotel suite shares.',
            ownershipInfo: '100% Freehold ownership for Saudi/GCC nationals & long-term leasehold share Certificate for international investors.',
            facilitiesText: 'Shuttle to Haram every 15 mins, 24/7 Concierge, Gourmet Dining, Helipad, Multi-story Parking.',
          },
          {
            language: 'bn',
            name: 'আইকন টাওয়ার মক্কা',
            shortDescription: 'হারাম শরিফ থেকে মাত্র ৮০০ মিটারে ৫-তারকা লাক্সারি হোটেল অ্যাপার্টমেন্ট টাওয়ার।',
            description: 'আইকন টাওয়ার মক্কা আজিয়াদ ডিস্ট্রিক্টে অবস্থিত একটি ৩২ তলা বিশিষ্ট লাক্সারি প্রজেক্ট। এতে রয়েছে শেয়ারভিত্তিক বিনিয়োগ ও বার্ষিক মুনাফার সুবর্ণ সুযোগ।',
            ownershipInfo: 'আন্তর্জাতিক বিনিয়োগকারীদের জন্য লিজহোল্ড শেয়ার সার্টিফিকেট ও আইনি পার্পেচুয়াল রাইট।',
            facilitiesText: '২৪ ঘণ্টা হারাম শাটল বাস, রুফটপ ক্যাফে, ৩ স্তরের সিকিউরিটি, ভিআইপি লাউঞ্জ।',
          },
          {
            language: 'ar',
            name: 'برج آيكون مكة المكرمة',
            shortDescription: 'برج شقق فندقية فاخرة 5 نجوم على بعد 800 متر من الحرم المكي الشريف.',
            description: 'برج آيكون مكة هو معلم ضيافة مكون من 32 طابقًا في حي أجياد الراقي. يتيح ملكية حصص فندقية وعوائد استثمارية واعدة.',
            ownershipInfo: 'ملكية تامة للسعوديين ودول مجلس التعاون، مع شهادات استثمار قانونية للمستثمرين الدوليين.',
            facilitiesText: 'حافلات نقل تبادلية للحرم على مدار الساعة، خدمة كونسيرج 24/7، مواقف سيارات متعددة الطوابق.',
          },
        ],
      },
      media: {
        create: [
          {
            type: 'IMAGE',
            url: '/images/icon-tower-makkah.jpg',
            thumbnailUrl: '/images/icon-tower-makkah.jpg',
            title: 'Haram Proximity Landmark & Masterplan',
            sortOrder: 1,
          },
          {
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
            title: 'Exterior 5-Star Hotel Architecture',
            sortOrder: 2,
          },
          {
            type: 'IMAGE',
            url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
            title: 'Executive Suite Interior',
            sortOrder: 3,
          },
        ],
      },
      units: {
        create: [
          {
            unitIdentifier: 'Suite 1204 - Type A',
            type: 'Hotel Suite',
            size: '48 sqm',
            price: 350000,
            currency: 'SAR',
            status: 'AVAILABLE',
          },
          {
            unitIdentifier: 'Suite 1808 - Executive VIP',
            type: '2-Bedroom Hotel Suite',
            size: '85 sqm',
            price: 680000,
            currency: 'SAR',
            status: 'RESERVED',
          },
        ],
      },
      installmentPlans: {
        create: [
          {
            name: 'Standard 36-Month Plan',
            description: '20% Down Payment, balance in 36 equal monthly installments.',
            downPaymentAmount: 70000,
            monthlyAmount: 7777,
            durationMonths: 36,
            order: 1,
          },
        ],
      },
      facilities: {
        create: [
          { name: '24/7 Haram Shuttle', icon: 'Bus' },
          { name: 'Luxury Restaurant & Buffet', icon: 'Utensils' },
          { name: 'High-speed Elevators', icon: 'ArrowUpCircle' },
          { name: 'Underground Parking', icon: 'Car' },
        ],
      },
      documents: {
        create: [
          {
            title: 'Icon Tower Makkah Official Brochure (PDF)',
            type: 'Brochure',
            fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            visibility: 'PUBLIC',
          },
        ],
      },
    },
  });

  // 6. Create Verified Subject-Matched Blog Posts
  await prisma.blogPost.deleteMany({});
  
  await prisma.blogPost.create({
    data: {
      slug: 'real-estate-investment-guide-makkah-2026',
      authorId: adminUser.id,
      featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      category: 'Makkah Real Estate',
      status: 'PUBLISHED',
      seoTitle: 'Guide to Real Estate Investment in Makkah 2026 | Icon International',
      metaDescription: 'Discover why fractional hotel investment in Makkah is offering stable perpetual yields for regional and international investors.',
      translations: {
        create: [
          {
            language: 'en',
            title: 'Strategic Insights: Real Estate Investment Opportunities in Makkah 2026',
            excerpt: 'Exploring the continuous growth of hospitality demand in Holy Makkah and how international investors are securing passive returns.',
            content: `
              <p>Makkah Al-Mukarramah continues to experience unprecedented demand for high-caliber hospitality accommodation driven by Saudi Arabia's Vision 2030 initiatives.</p>
              <h3>Why Invest in Makkah Hotel Apartments?</h3>
              <ul>
                <li>Year-round high occupancy during Umrah and Hajj seasons.</li>
                <li>Haram proximity premium ensuring resilient property values.</li>
                <li>Transparent legal frameworks for GCC and international investors.</li>
              </ul>
              <p>At Icon International, we offer curated investment structures allowing investors to participate directly in premium hospitality assets with professional management.</p>
            `,
          },
          {
            language: 'bn',
            title: 'মক্কা আল-মুকাররামায় রিয়েল এস্টেট বিনিয়োগের কৌশলগত নির্দেশনা ২০২৬',
            excerpt: 'পবিত্র মক্কায় হোটেল ও আবাসন খাতে ক্রমাগত প্রবৃদ্ধি এবং প্রবাসী বিনিয়োগকারীদের সুবর্ণ সুযোগ নিয়ে বিস্তারিত প্রতিবেদন।',
            content: `<p>সৌদি ভিশন ২০৩০-এর অংশ হিসেবে পবিত্র মক্কায় বিশ্বমানের হোটেল ও আবাসন খাতে ঐতিহাসিক প্রবৃদ্ধি অর্জিত হচ্ছে...</p>`,
          },
          {
            language: 'ar',
            title: 'رؤى استراتيجية: فرص الاستثمار العقاري في مكة المكرمة 2026',
            excerpt: 'استكشاف النمو المستمر على طلب الضيافة في مكة المكرمة وكيف يحقق المستثمرون عوائد مستقرة.',
            content: `<p>تستمر مكة المكرمة في تسجيل مستويات إشغال قياسية في قطاع الفندقة والضيافة على مدار العام...</p>`,
          },
        ],
      },
    },
  });

  await prisma.blogPost.create({
    data: {
      slug: 'salalah-khareef-property-investment-oman',
      authorId: adminUser.id,
      featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      category: 'Oman Property',
      status: 'PUBLISHED',
      seoTitle: 'Salalah Beachfront Property Investment Guide | Icon International',
      metaDescription: 'High yield beachfront luxury flats in Salalah with guaranteed tourist Khareef rental returns.',
      translations: {
        create: [
          {
            language: 'en',
            title: 'Salalah Tourism Boom: Investing in Omani Beachfront Residential Real Estate',
            excerpt: 'Why Salalah’s Khareef monsoon season drives record tourist occupancy and lucrative rental yields for expatriate property owners.',
            content: `<p>Salalah has emerged as the premier eco-tourism destination in the Arabian Peninsula. Learn how 100% freehold ITC property ownership empowers investors.</p>`,
          },
          {
            language: 'bn',
            title: 'সালালাহ ট্যুরিজম ও ওমানে সাগর সংলগ্ন অ্যাপার্টমেন্ট বিনিয়োগ',
            excerpt: 'ওমানের সালালাহে সাগর সংলগ্ন ফ্রিহোল্ড অ্যাপার্টমেন্ট এবং পর্যটন মৌসুমে উচ্চ রেন্টাল ইনকামের সুযোগ।',
            content: `<p>ওমানের সালালাহে আস সাআদাহ উপকূলে ফ্রিহোল্ড লাক্সারি ফ্ল্যাটে বিনিয়োগের সম্পূর্ণ তথ্য...</p>`,
          },
          {
            language: 'ar',
            title: 'طفرة السياحة في صلالة: الاستثمار في العقارات السكنية المطلة على البحر',
            excerpt: 'لماذا يحقق موسم الخريف في صلالة نسبة إشغال سياحي قياسية وعوائد إيجارية مجزية.',
            content: `<p>تعتبر صلالة الوجهة السياحية الأولى في شبه الجزيرة العربية خلال موسم الخريف...</p>`,
          },
        ],
      },
    },
  });

  await prisma.blogPost.create({
    data: {
      slug: 'gcc-investor-visa-residency-guide-2026',
      authorId: adminUser.id,
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      category: 'Investor Visa',
      status: 'PUBLISHED',
      seoTitle: 'GCC Investor Visa & Commercial Residency Guide 2026',
      metaDescription: 'Step-by-step guidance on obtaining investor residency and commercial licenses in Oman & Saudi Arabia.',
      translations: {
        create: [
          {
            language: 'en',
            title: 'Navigating GCC Investor Visa Regulations & Corporate Residency in 2026',
            excerpt: 'A comprehensive legal walkthrough for business founders and high-net-worth investors establishing GCC residency.',
            content: `<p>Securing investor residency in Oman and Saudi Arabia opens unprecedented commercial expansion opportunities...</p>`,
          },
          {
            language: 'bn',
            title: 'জিসিসি ইনভেস্টর ভিসা ও কর্পোরেট রেসিডেন্সি গাইড ২০২৬',
            excerpt: 'ওমান ও সৌদি আরবে ইনভেস্টর ভিসা ও ব্যবসা নিবন্ধন প্রক্রিয়ার আইনি সহজ সমাধান।',
            content: `<p>আন্তর্জাতিক বিনিয়োগকারীদের জন্য জিসিসি অঞ্চলের ইনভেস্টর ভিসা আবেদনের ধাপসমূহ...</p>`,
          },
          {
            language: 'ar',
            title: 'دليل تأشيرة المستثمر والإقامة التجارية في دول مجلس التعاون 2026',
            excerpt: 'شرح قانوني شامل لتأسيس الشركات والحصول على الإقامة الاستثمارية.',
            content: `<p>تتيح الإقامة الاستثمارية في عُمان والسعودية آفاقًا تجارية واسعة لرجال الأعمال...</p>`,
          },
        ],
      },
    },
  });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
