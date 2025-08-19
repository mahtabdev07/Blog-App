import { PrismaClient, BlogStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleared existing data");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        bio: "Full-stack developer passionate about Next.js and React. Love sharing knowledge through writing.",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        bio: "UI/UX designer turned developer. Focused on creating beautiful and accessible web experiences.",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Mike Chen",
        email: "mike@example.com",
        password: hashedPassword,
        bio: "Backend engineer with expertise in databases and API design. GraphQL enthusiast.",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Emma Wilson",
        email: "emma@example.com",
        password: hashedPassword,
        bio: "DevOps engineer with a passion for cloud infrastructure and automation.",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
      },
    }),
    prisma.user.create({
      data: {
        name: "Alex Rodriguez",
        email: "alex@example.com",
        password: hashedPassword,
        bio: "Mobile app developer specializing in React Native and Flutter.",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  const blogData = [
    {
      title: 'Oscar Hopeful: "The Ritual" set for chilling fall premiere',
      slug: "the-ritual-film-2025",
      excerpt:
        'Indie horror sensation "The Ritual" is expected to be a festival sleeper hit, with an eerie new poster released for its October debut.',
      content: `Emerging director Olly Stevens brings "The Ritual," a dark new folk horror film, to audiences this fall. Expect an intense atmosphere, a haunting score, and a harrowing story of survival as a group of friends confront ancient evils in Britain's remote countryside.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/9dac1ff2caf583ba92d8269d7de3119114ef88a7.png",
      status: BlogStatus.PUBLISHED,
      authorId: users[1].id,
    },
    {
      title: `From February 27, in cinemas, "Cleaner" - an action thriller from the director of "Casino Royale" - will be released`,
      slug: "cleaner-movie-2025",
      excerpt:
        'A gripping tale of redemption and survival, "Cleaner" follows a former hitman forced to confront his past when a job goes wrong.',
      content: `In "Cleaner," a former hitman is pulled back into the criminal underworld when a routine job takes a deadly turn. As he fights to protect his family and survive the chaos, he must confront the ghosts of his past and make impossible choices. With stunning action sequences and a powerful performance from the lead actor, "Cleaner" is a must-see for thriller fans.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/9c14f7270f9920e31e41249472157d43a43ae28c.jpg",
      status: BlogStatus.PUBLISHED,
      authorId: users[0].id,
    },
    {
      title: "A new animated masterpiece — “Savages” in theaters July 3",
      slug: "a-new-animated-masterpiece-savages",
      excerpt:
        "“Savages” in Theatres July 3 “Wild Family” follows the story of 11-year-old Keria, who lives with her father in Borneo near the tropical rainforest.",
      content: `“Savages” in Theatres July 3 “Wild Family” follows the story of 11-year-old Keria, who lives with her father in Borneo near the tropical rainforest. Her mother belonged to the indigenous Penan people; a fact Keria hadn’t paid much attention to—until she met her relatives on her mother’s side. The situation becomes complicated when logging companies begin clearing the forest, threatening the traditional way of life of her tribe. Joined by her cousin Selay and a baby orangutan named Osha, Keria decides to fight for the preservation of the forest and her people’s culture. The film explores powerful themes of environmental protection, ancestral traditions, and the resilience of children.

“Savages” premiered to acclaim at the 2024 Cannes Film Festival, and now this vibrant, adventure-filled story is ready to capture the hearts of Russian audiences starting July 3.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/0bf4f6754dd92f6f95f1ca768b0e6baf1f1c6daf.jpg",
      status: BlogStatus.PUBLISHED,
      authorId: users[2].id,
    },
    {
      title:
        "Hayao Miyazaki's legendary film Princess Mononoke in theatres in a newly restored 4K version",
      slug: "hayao-miyazaki-princess-mononoke-4k",
      excerpt:
        "On August 14, 2025, the film distribution company RWV Film will release Hayao Miyazaki’s legendary film Princess Mononoke in theatres in a newly restored 4K version.",
      content: `On August 14, 2025, the film distribution company RWV Film will release Hayao Miyazaki’s legendary film Princess Mononoke in theatres in a newly restored 4K version. This adventurous animated fantasy, inspired by Japanese history and mythology, is being re-released in celebration of Studio Ghibli’s 40th anniversary. The film is considered one of the studio’s greatest masterpieces and also one of its most ambitious works. It will be shown with a new dub by Studiynaya Banda. 

To mark Studio Ghibli’s 40th anniversary, Princess Mononoke returns to the big screen in stunning 4K restoration. According to Studio Vice President Atsushi Okui, Ghibli films were originally released on film stock, but with many cinemas now equipped for 4K projection, the studio decided to present this landmark animated film in higher quality.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/04/c02fdf7fd2fe5a5c7ffc324aaccd88c38783346b.jpg",
      status: BlogStatus.PUBLISHED,
      authorId: users[0].id,
    },
    {
      title: '"How to Make a Killing" in cinemas from May 15!',
      slug: "how-to-make-a-killing",
      excerpt:
        'Watch "Fargo in French" from the producers of  "Cat & Dog" and "The Pot-a-Feu". "How to Make a Killing" is the third directorial project by Franck Dubosc, who also played one of the main roles in the film.',
      content: `Watch "Fargo in French" from the producers of  "Cat & Dog" and "The Pot-a-Feu".



"How to Make a Killing" is the third directorial project by Franck Dubosc, who also played one of the main roles in the film. This witty black comedy has already become a hit in France, having collected more than 10 million euros. Such success is not surprising, because the producers of such hits as "The Count of Monte Cristo" and "Recipe for Love" are behind the film. In addition, the film has already received high marks from viewers, who compare it to the cult "Fargo" by the Coen brothers.



The plot centers on a married couple tired of everyday and financial problems and mired in routine. There has long been no place for romance, interest in life and any hint of adventure, the relationship is limited to meager conversations over dinner. But one morning, everything changes after an absurd accident, forcing the spouses who have cooled towards each other to go on a rampage, because the temptation to get rich and try on the role of real mafiosi is something that can definitely add fire to the relationship.



"How to Make a Killing" in cinemas from May 15.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/4b8e82cacd95d54e95987f517155079e9df22046.png",
      status: BlogStatus.PUBLISHED,
      authorId: users[4].id,
    },
    {
      title: 'The сult сlassic "Progulka" returns to the big screen',
      slug: "the-cult-classic-progulka-returns-to-the-big-screen",
      excerpt:
        'Aleksei Uchitel’s film "Progulka", which launched the careers of Irina Pegova, Pavel Barshak, and Evgeny Tsyganov, is hitting theatres again on July 24—22 years after its original release. ',
      content: `Aleksei Uchitel’s film "Progulka", which launched the careers of Irina Pegova, Pavel Barshak, and Evgeny Tsyganov, is hitting theatres again on July 24—22 years after its original release. 

One summer day in St. Petersburg, three young strangers cross paths by chance and set off on a spontaneous journey through the city. She is bold, free-spirited, and bursting with life. They are two men pulled into her playful orbit. "Progulka" isn’t just a stroll through city streets—it's a walk toward self-discovery and connection. Shot in near-real time, the film turns everyday encounters into profound moments and casual chatter into heartfelt confessions. It’s a story about youth, fleeting moments, and the art of being present. 

Nearly a quarter-century later, the film finds new meaning with a new generation. In a world of fast reels and screen-bound interactions, it feels especially timely—a rare chance to live fully in the moment, alongside the city and oneself. "Progulka" hasn’t lost its relevance—it’s simply gained new layers, interpreted through the lens of our times.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/8629f67479534ea5ba65482a85028482fb57d727.jpg",
      status: BlogStatus.PUBLISHED,
      authorId: users[3].id,
    },
    {
      title: '"Leave One Day" is happening - and we know when!',
      slug: "leave-one-day-is-happening-and-we-know-when",
      excerpt:
        'On August 21, RWV Film will release "Leave One Day" (Partir un Jour) in theatres — the opening film of the 78th Cannes Film Festival, directed by Amélie Bonnen.',
      content: `On August 21, RWV Film will release "Leave One Day" (Partir un Jour) in theatres — the opening film of the 78th Cannes Film Festival, directed by Amélie Bonnen. This French ode to love, music, and cuisine marks a historic moment as the first debut feature ever selected to open the Cannes Festival. "Leave One Day" also won Best Film at the VOICES Young Cinema Festival.

At the heart of the story is Cecile, a gifted chef who dreams of opening her restaurant in Paris. But when her father suffers a heart attack, her plans change, and she returns to her hometown, only to reconnect with her first love, Raphael.

"Leave One Day" is a love letter to the past, to French music and culinary traditions, and the warmth, wit, and authenticity of life in the French provinces.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/03/5ce04197b70660699ae5b634667a677cf6277ddf.jpg",
      status: BlogStatus.PUBLISHED,
      authorId: users[3].id,
    },
    {
      title: "The supernatural horror Siccin 7 in theatres on August 21",
      slug: "the-supernatural-horror-siccin-7",
      excerpt:
        "Turkish horror master Alper Mestçi returns with Siccin 7: supernatural terror based on true events, in cinemas August 21.",
      content: `Director Alper Mestçi, renowned for his chilling work in Turkish horror, presents Siccin 7 — a film inspired by real events. Dr. Kemal moves his family into an ancestral home, only to face inexplicable horrors and forbidden rituals performed under the Black Moon. On August 21, the film distribution company RWV Film will release the supernatural horror movie Siccin 7 in theatres. This is a new film by Alper Mestçi, one of Turkey’s leading genre directors whose works are recognised internationally. The storyline is based on real events.
The film follows Dr. Kemal, who moves his family into his uncle’s mansion, hoping to heal his seriously ill daughter. Matters are further complicated by his mother’s progressing Alzheimer’s disease. Under the guise of helping Kemal, a mysterious young woman named Meral moves into the house—but her true intention is to perform a ritual under the Black Moon.`,
      coverImageUrl:
        "https://rwvfilm.com/uploads/media/image/0001/04/70ab21c39700ccfb06206458f04244146a99becd.png",
      status: BlogStatus.PUBLISHED,
      authorId: users[2].id,
    },
  ];

  const blogs = await Promise.all(
    blogData.map((blog) => prisma.blog.create({ data: blog }))
  );

  console.log(`\n✅ Seed completed successfully!`);
  console.log(`\n📊 Users: ${users.length}, Blogs: ${blogs.length}`);
  console.log(
    `   Published: ${blogs.filter((b) => b.status === "PUBLISHED").length}`
  );
  console.log(`   Drafts: ${blogs.filter((b) => b.status === "DRAFT").length}`);
  console.log("\n👥 Sample Users (password: password123):");
  users.forEach((user) => {
    console.log(`   ${user.name} (${user.email})`);
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
