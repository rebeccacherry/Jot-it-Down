const conn = require('./conn');
const User = require('./User');
const Entry = require('./Entry');
const Journal = require('./Journal')
const dayjs = require ('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
const  Product  = require('./Product');
const Order = require('./Order');
const LineItem  = require('./LineItem');

Journal.belongsTo(User);
User.hasMany(Journal) // change this to User.hasOne(Journal) if I want to change functionality
Entry.belongsTo(Journal);
Journal.hasMany(Entry);

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product); 

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123', firstName: 'moe', lastName: 'Doe', email: 'moe@gmail.com', address: '1234 Grand St, Brooklyn, NY, 11211', phone: '212-111-1111' }),
    User.create({ username: 'lucy', password: '123', firstName: 'lucy', lastName: 'Doe', email: 'lucy@gmail.com', address: '1234 Mott St, New York, NY, 10013', phone: '212-222-2222' }),
    User.create({ username: 'larry', password: '123', firstName: 'larry', lastName: 'Doe', email: 'larry@gmail.com', address: '1234 Riverside Drive St, New York 10023', phone: '212-333-3333' }),
    User.create({ username: 'ethyl', password: '123', firstName: 'ethyl', lastName: 'Doe', email: 'ethyl@gmail.com', address: '1234 5th Ave, apt 3412, New York 10065', phone: '212-444-4444' }),
    User.create({ username: 'admin', password: 'admin', adminStatus: true }),
  ]);



  const MugSet = await Product.create({ 
    name: "Coffee Mug Set", 
    imageUrl: "https://images.unsplash.com/photo-1666713711218-8ea7743c8ed1", 
    category: "mug",
    description:'Indulge in a Perfect Coffee Experience with our Modern Rustic Coffee Cups. JoitIt presents a set of four exquisite cups that effortlessly blend modern aesthetics with rustic charm. Crafted without handles, these cups offer a unique tactile experience. Made from premium ceramic, they provide excellent heat retention for a longer-lasting, enjoyable sip. Elevate your coffee rituals with our modern rustic coffee cups and savor every moment of your favorite brew in style.',
    price: 50.00,
    size: 'NoSize'
  });

  const TeaSet = await Product.create({
    name: "Tea Set",
    imageUrl: "https://images.unsplash.com/photo-1551540827-6c8ae1aaedbb",
    category: "mug",
    description: 'Discover the Elegance of Tea with our Modern Tea Set. At JoitIt Down, we present a tea set designed for the contemporary tea connoisseur. This sleek and minimalist set includes a teapot, cups, and a bowl. The combination of fine porcelain and ergonomic design ensures a seamless brewing experience. Elevate your tea rituals with our modern tea set and savor the perfect blend of style and functionality.',
    price: 60.00,
    size: 'NoSize'
  });

  const MensLogoTshirt = await Product.create({
    name: "Mens Back Logo Tshirt",
    imageUrl: "https://images.unsplash.com/photo-1684343998050-a206033c7af4",
    category: "shirt",
    description: 'Uncompromising Quality, Unmatched Comfort. This white tee by JoitIt redefines perfection. Made with premium materials, it offers a soft touch and exceptional breathability. With our logo tastefully displayed on the back, its a symbol of the impeccable quality that defines JoitIt. Experience true comfort without compromise',
    price: 15.00,
  });

  const MensTshirt = await Product.create({
    name: "Mens Front Logo Tshirt",
    imageUrl: "https://images.unsplash.com/photo-1684343998187-6c17cd52224d?",
    category: "shirt",
    description: 'Elevate Your Style, Embrace Quality. Crafted with care, this white tee from JoitIt exudes exceptional comfort and durability. With our logo subtly placed on the front, its a testament to our commitment to superior craftsmanship and attention to detail. Experience the essence of premium quality.',
    price: 15.00,
  });

  const WomensTshirt = await Product.create({
    name: "Womens Front Logo Tshirt",
    imageUrl: "https://images.unsplash.com/photo-1684343998506-da8d8e0ceaf3",
    category: "shirt",
    description: 'Elevate Your Style, Embrace Quality. Crafted with care, this white tee from JoitIt exudes exceptional comfort and durability. With our logo subtly placed on the front, its a testament to our commitment to superior craftsmanship and attention to detail. Experience the essence of premium quality.',
    price: 15.00,
  });

  const WomensLogoTshirt = await Product.create({
    name: "Womens Back Logo Tshirt",
    imageUrl: "https://images.unsplash.com/photo-1684343998121-93bf7b5af2c8",
    category: "shirt",
    description: 'Uncompromising Quality, Unmatched Comfort. This white tee by JoitIt redefines perfection. Made with premium materials, it offers a soft touch and exceptional breathability. With our logo tastefully displayed on the back, its a symbol of the impeccable quality that defines JoitIt. Experience true comfort without compromise',
    price: 15.00,
  });

  const YogaMats = await Product.create({
    name: "Yoga Mat",
    imageUrl: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30",
    category: "healthProduct",
    description: 'Our collection features yoga mats in four stunning colors: Grey, Black, Turquoise, and Pink. Crafted with superior materials, these mats offer exceptional comfort and grip, ensuring a fulfilling yoga experience. Elevate your practice with style and indulge in the perfect harmony of form and function.',
    price: 55.00,
    size: 'NoSize'
  });

  const SingingBowlSet = await Product.create({
    name: "Singing Bowl Set",
    imageUrl: "https://images.unsplash.com/photo-1579291465628-98115e927a42",
    category: "healthProduct",
    description: 'Discover the Tranquility of Sound with our Singing Bowl Set. Immerse yourself in the soothing tones of our meticulously crafted singing bowls, as a set with two sizes. Each set includes two beautiful singing bowl and a handcrafted wooden stick. Experience the profound healing vibrations and create a serene atmosphere wherever you go. Embrace mindfulness and embark on a journey of inner harmony with our Singing Bowl Set.',

});


  

const journals = [
 {
  userId: moe.id,
  title: 'My Gratitude Journal',
  description: 'A daily journal to keep my thoughts on gratitude and what I am grateful for in my life.',
  imageUrl: 'https://images.unsplash.com/photo-1520179432903-03d08e6ef07a'
},
 {
  userId: lucy.id,
  title: 'The Daily Journal',
  description: 'A daily journal for my life.',
  imageUrl: 'https://images.unsplash.com/photo-1558898479-33c0057a5d12'
 },
 {
  userId: larry.id,
  title: 'My Financial Journal',
  description: 'A daily journal to keep my ideas about finances, investing and stocks.',
  imageUrl: 'https://images.unsplash.com/photo-1632507127789-eb70cc8757af'
},
 {
  userId: ethyl.id,
  title: 'My Food Journal',
  description: 'My daily journal to keep my food diary, ideas, recepies, thoughts and learning about food and nutrition.',
  imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af'
},
 
];

const [moeFirstJournal, lucyFirstJournal, larryFirstJournal, ethylFirstJournal]= await Promise.all(journals.map((journal) => {
  const newJournal = Journal.create(journal);
return newJournal
}));

 const entries = [
  {
    journalId: moeFirstJournal.id,
    subject: 'I am grateful for my family',
    description: 'Today, I am overwhelmed with gratitude for my family. Despite all the ups and downs of life, my loved ones have always been there for me, providing unwavering support and unconditional love. Whether it is my parents, siblings, or extended family, I am blessed to have such wonderful people in my life.',
    imageUrl: 'https://images.unsplash.com/photo-1576014131795-d440191a8e8b',
    date: '2023-05-04', 
    time: '11:10',
    
  },
  {
    journalId: moeFirstJournal.id,
    subject: 'I have so much abundance',
    description: 'As I look around me, I am reminded of all the abundance in my life. I have a comfortable home, nutritious food, clean water, and all the basic necessities of life. I am fortunate to have a stable job and it provides me with financial security. Today, I am grateful for all the abundance in my life, and I pledge to use my blessings to help others in need.',
    date: '2023-05-06', time: '07:40',
    imageUrl: 'https://images.unsplash.com/photo-1617206684467-00251bad9303'
  },
  {
    journalId: moeFirstJournal.id,
    subject: 'My pets bring me joy',
    description: 'My furry friends have brought me so much joy and companionship over the years. From my loyal dog to my cuddly cat, they never fail to put a smile on my face. Today, I am grateful for the unconditional love and loyalty of my pets, who remind me to slow down and appreciate the simple things in life.',
    date: '2023-05-07', time: '08:37',
    imageUrl: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35'
  },
  {
    journalId: moeFirstJournal.id,
    subject: 'Thank you for my children',
    description: 'As a parent, I am incredibly grateful for the gift of children. They bring so much laughter, learning, and love into my life. Every day, I am amazed by their curiosity, creativity, and resilience. Today, I am filled with gratitude for the privilege of being a parent and for the countless lessons that my children have taught me.',
    date: '2023-05-08', time: '4:15PM',
    imageUrl: 'https://images.unsplash.com/photo-1492269815085-88eb3ffe14e5'
  },
  {
    journalId: moeFirstJournal.id,
    subject: 'Thankful for my health',
    description: 'Today, I am grateful for my health. In a world where illness and disease are all too common, I am blessed to have a body that functions well and a mind that is sharp. I know that good health is a precious gift that should never be taken for granted. So today, I pledge to take care of my body and mind so that I can continue to enjoy this gift for years to come.',
    date: '2023-05-09', time: '11:10',
    imageUrl: 'https://images.unsplash.com/photo-1545945774-73922eb27813'
  },
  {
    journalId: lucyFirstJournal.id,
    subject: 'College midterms',
    description: 'Today, I had a long day at school, but it was productive. I was able to finish my midterm essay, and I am feeling pretty good about it. It was a bit of a challenge balancing my schoolwork and spending time with my boyfriend Adam, but I managed to make it work. I am grateful for the support he provides, and I know that I could not have done it without him.',
    date: '2023-05-06', time: '7:12'
  },
  {
    journalId: lucyFirstJournal.id,
    subject: 'Adam 6 months!! xoxo',
    description: 'Adam and I have been together for six months, and things are going really well. We are both busy with school and other commitments, but we always make time for each other. I know he really loves me and I have a lot of hope for the future, even with grad school in the future. Today, we went on a long walk in the park, and it was so nice just to be together and enjoy the beautiful weather without all our friends and the pressure of parties and journaling. I am grateful to have someone in my life who makes me feel so loved and supported and I hope he knows how much I love him.',
    date: '2023-05-07', time: '11:05'
  },
  {
    journalId: lucyFirstJournal.id,
    subject: 'My fitness update',
    description: 'I have been trying to stay active lately since last semester I did almost nothing and gained five pounds! UGG! Anyways, I am not going to gripe on myself, so I started going to the gym a few times a week. Today, I went for a run and then did some weightlifting. It felt great to sweat and push myself, and I know that exercise is important for both my physical and mental health. I am looking forward to making fitness a regular part of my routine, especially with all the late night pizza and journaling. Maybe I should stop that stuff?',
    date: '2023-05-08', time: '5:34'
  },
  {
    journalId: lucyFirstJournal.id,
    subject: 'Missing my sister today',
    description: 'Today, I talked to my older sister Jane on the phone for a while. We do not get to see each other very often because we live in different parts of the world now, but it is always great to catch up. I am so proud of her and her choices to become a translator for the UN. It is a really exciting job. Jane told me she is worried about her new apartment, because there are mice in it and her landlord seems uninterested in fixing the problem. She also told me that the cafes are amazing and Paris is her favorite city now! I told her about the last few weeks at school, some gossip about friends. I told her ALL about Adam!!! Maybe I left out a few things, but basically... EVERYTHING! I am really excited for her to meet him this summer at the Lake house! I am grateful for my family and for the close relationship I have with my Jane. I just miss her a lot and wish we could spend more time together as a family now that she lives in Paris for school.',
    date: '2023-05-10', time: '9:54'
  },
  {
    journalId: lucyFirstJournal.id,
    subject: 'The audition and the Frat party',
    description: 'Today was a whirlwind of emotions. I auditioned for a play in the morning, and I am really worried that I totally bombed it. I practiced my lines over and over again, but when I got up on stage, I froze. I stumbled over my words and felt like I could not catch my breath. Now, I cannot stop thinking about when I could have done differently. I really wanted to be a part of the play, and I hope that my bad audition will not prevent me from getting a part. Later in the evening, my boyfriend and I went to a fraternity party. It was wild! There was so much energy and excitement in the air. I saw some people I knew from my dorm, and we danced together for a while. I also heard some juicy gossip about one of the frat brothers. Apparently, he is been seeing two girls at once, and they both found out about each other. There was a lot of drama and shouting, and I felt a little uncomfortable being there. I am not a fan of getting involved in other peoples problems, but it was hard not to get caught up in the drama. It was a huge fight on the lawn and everyone saw it. Overall, it was a crazy day, and my emotions were all over the place. I am still worried about the audition, but I am trying to focus on the positive. And as for the frat party, I am not sure I want to go to another one anytime soon. I am feeling really over the people and drama right now.',
    date: '2023-05-13', time: '11:58'
  },
  {
    journalId: larryFirstJournal.id,
    subject: 'A Rocky Start',
    description: 'What a fucking day. The stock market was all over the place, and my portfolio took a hit. I knew I should not have listened to that bullshit advice from my neighbor. But what can I say? I am a skeptic, and I like to hear all sides of the argument. Unfortunately, it cost me today. But like they say, "If you are not willing to own a stock for ten years, do not even think about owning it for ten minutes." I am in this for the long haul, and I am not going to let one bad day get me down.',
    date: '2023-05-02', time: '8:47'
  },
  {
    journalId: larryFirstJournal.id,
    subject: 'Finding a Gem',
    description: 'You will not believe what happened today with one of my clients, Bob. He barged into my office, claiming to have insider information about a stock that could either make him a millionaire or bankrupt him. The catch? It is a company that makes jetpacks for penguins. Yes, you read that right. After some laughter and contemplating the absurdity, I decided to invest a small portion of Bobs funds into this penguin jetpack stock. Who knows, it might just be the next big thing. Now, we wait to see if Bobs crazy hunch pays off.',
    date: '2023-05-05', time: '7:02'
  },
  {
    journalId: larryFirstJournal.id,
    subject: 'A Big Win',
    description: 'I am on top of the fucking world right now! My company just landed a huge advertising contract, and it is going to bring in some serious cash. I have been working my ass off for this, and its finally paying off. But I am not going to get complacent. As Jim Cramer says, "Bulls make money, bears make money, and pigs get slaughtered." I am going to stay hungry and keep pushing.',
    date: '2023-05-07', time: '6:18'
  },
  {
    journalId: larryFirstJournal.id,
    subject: 'A Costly Mistake',
    description: 'I made a stupid mistake today. I got caught up in the hype around a certain stock and bought in without doing my due diligence. And of course, the stock tanked shortly after. I am kicking myself right now. As Peter Lynch said, "Know what you own, and know why you own it." I did not follow that advice, and now I am paying the price. But I am not going to let one mistake define me. I will learn from it and move on.',
    date: '2023-05-11', time: '11:21'
  },
  {
    journalId: larryFirstJournal.id,
    subject: 'The Road Ahead',
    description: 'I am feeling optimistic about the future. My company is doing well, and I have made some solid investments that I believe in. But I know that there will be bumps along the way. As John Paulson said, "I always ask myself how bad it can get, and if I can withstand that, then everything else is a cakewalk." I know that I can handle the ups and downs, and I am excited to see where this journey takes me.',
    date: '2023-05-12', time: '6:31'
  },
  {
    journalId: ethylFirstJournal.id,
    subject: 'The Start of a New Journey',
    description: 'Today marks the first day of my food diary. I am determined to take control of my health and make some positive changes. I had a bowl of oatmeal with half a cup of blueberries and a handful of almonds for breakfast, along with a cup of black coffee. For lunch, I made a spinach salad with half a cup of grilled chicken, a small tomato, half a cucumber, and a tablespoon of olive oil and balsamic vinegar dressing. I also had a small apple on the side. And for dinner, I made six ounces of grilled salmon with half a cup of roasted asparagus and half a cup of brown rice. I also had a small piece of dark chocolate for dessert. In between meals, I snacked on some carrot sticks and hummus. It feels good to be mindful of what I am putting in my body, and I am excited to see where this journey takes me.',
    date: '2023-05-04', time: '7:12'
  },
  {
    journalId: ethylFirstJournal.id,
    subject: 'Struggling to Stay on Track',
    description: 'I am finding it difficult to stay on track with my food diary. Today, I had a busy day running errands and ended up grabbing fast food for lunch. I had a small burger with lettuce and tomato, a small order of fries, and a bottle of water. I know it is not the best choice, but sometimes life gets in the way. As the saying goes, "If at first you don not succeed, try, try again." I am not going to let one setback ruin my progress. Later in the day, I snacked on a small bowl of mixed berries and a handful of almonds.',
    date: '2023-05-05', time: '8:41'
  },
  {
    journalId: ethylFirstJournal.id,
    subject: ' Finding Joy in Movement',
    description: 'I took my dogs for a 20-minute walk this morning, and it felt great to get some fresh air and movement in. Later in the day, I did some stretching and gentle yoga poses for 15 minutes. As I get older, I am realizing how important it is to stay active and mobile. As Joseph Pilates said, "Physical fitness is the first requisite of happiness." My grandkids came over for a visit today, and we played some outdoor games together, which was a lot of fun.',
    date: '2023-05-06', time: '9:03'
  },
  {
    journalId: ethylFirstJournal.id,
    subject: 'Making Healthy Swaps',
    description: 'I have been doing some research on healthy eating, and I have learned about some simple swaps I can make to improve my diet. For example, I have started using half a cup of Greek yogurt instead of sour cream, and I am using one tablespoon of olive oil instead of butter. It is all about small changes that add up over time. As Michael Pollan said, "Eat food, not too much, mostly plants." Today, I made a veggie-packed omelette for breakfast with half a cup of diced bell peppers, mushrooms, and spinach. For lunch, I made a quinoa salad with one cup of mixed greens, half a cup of quinoa, half a cup of cherry tomatoes, half a cup of chickpeas, and one tablespoon of vinaigrette dressing. I also snacked on a small handful of mixed nuts in the afternoon.',
    date: '2023-05-08', time: '10:55'
  },
  {
    journalId: ethylFirstJournal.id,
    subject: 'Celebrating Small Victories',
    description: 'Today I am feeling proud of myself. I have been consistently tracking my food and fitness for the past 6 months, and I am seeing positive changes in my health. I have lost 10 pounds and my energy levels have increased. I have been experimenting with new recipes and have found some delicious and healthy meals that I love. For breakfast, I had a veggie omelette made with 2 eggs, peppers, onions, and spinach. For lunch, I had a quinoa salad with grilled chicken, mixed greens, cherry tomatoes, cucumbers, and a lemon vinaigrette dressing. As a snack, I had some apple slices with almond butter. For dinner, I made a recipe thealthProduct my grandchildren love - baked salmon with lemon and dill, served with roasted brussels sprouts and sweet potatoes. I also made some brown rice as a side dish. My family always enjoys my cooking and it makes me happy to see them enjoy healthy meals. I ended my day with a 30-minute walk with my dogs, and I did some light stretching afterward. I am grateful for my health and for the support of my family as I continue on this journey towards a healthier lifestyle.',
    date: '2023-05-11', time: '9:16'
  },
 ];

 await Promise.all(entries.map((entry) => {
  const newEntry = Entry.create(entry);
  // const journal = await Journal.findByPk(entry.journalId);
  // await newEntry.setEntry(journal);
  return newEntry
}));

// looking at all the entries to see createdAt for date and time
// library day.js to format the date and time - npm install dayjs

const allEntries = await Entry.findAll()
console.log(dayjs(new Date(allEntries[0].createdAt)).format('LLL'))





const cart = await ethyl.getCart();
await ethyl.addToCart({ product: YogaMats, quantity: 3});
await ethyl.addToCart({ product: TeaSet, quantity: 2});



return {
  users: {
    moe,
    lucy,
    larry,
    ethyl
  }
};
};

module.exports = {
  syncAndSeed,
  User,
  Entry,
  Journal,
  Product,
  LineItem
};
