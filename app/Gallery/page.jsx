"use client";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

const videos = [
  { src: `/assets/videos/A Wondrous Affair - Jackerman.mp4` },
  { src: `/assets/videos/Abella Danger - Big Butt Teen Ass Fucked.mp4` },
  { src: `/assets/videos/Abigail Mac, A Domestic Dicking.mp4` },
  { src: `/assets/videos/Adria Rae - Daddy's Debt.mp4` },
  { src: `/assets/videos/Aidra Fox, Unexpected Dinner Guest.mp4` },
  { src: `/assets/videos/Aj  Angela Lesbian Love.mp4` },
  { src: `/assets/videos/Alanah Rae - Ten Dollar Whore.mp4` },
  { src: `/assets/videos/Alexis Fawx - Let Mommy Help You.mp4` },
  {
    src: `/assets/videos/Alli Rae, Brandi Love, Kimmy Granger - The Wild Card.mp4`,
  },
  { src: `/assets/videos/An Inconvenient Mistress - Angela White.mp4` },
  { src: `/assets/videos/Angel-White-MILF-BBC-Hookup.mp4` },
  { src: `/assets/videos/Angela White  Violet Myers - BBC Sharing.mp4` },
  { src: `/assets/videos/Angela White , Gia Derza.mp4` },
  { src: `/assets/videos/Angela White - I Waited For You.mp4` },
  {
    src: `/assets/videos/Angela White - Nice Friends You Have, Mom - Latest XXX 2024.mp4`,
  },
  {
    src: `/assets/videos/Angela White - Up Inside Angela's Tightest Hole 2.mp4`,
  },
  { src: `/assets/videos/Angela White - Your Woman Has Needs, Dad!.mp4` },
  { src: `/assets/videos/Angela White Bouncing Back.mp4` },
  { src: `/assets/videos/angela white horny wet pussy.mp4` },
  { src: `/assets/videos/Angela White hot and sexy milf.mp4` },
  { src: `/assets/videos/Angela White In Her First Gangbang.mp4` },
  { src: `/assets/videos/Angela White latest bbc porn video.mp4` },
  { src: `/assets/videos/angela white no script for huge tits angela.mp4` },
  { src: `/assets/videos/Angela White Triple Penetrated.mp4` },
  { src: `/assets/videos/Angela White Vs Mandingo.mp4` },
  { src: `/assets/videos/Angela White X Mandingo BBC Upscaled 4k.mp4` },
  {
    src: `/assets/videos/Angela White-  angela white lips meet for the first time.mp4`,
  },
  { src: `/assets/videos/Angela White- full service banking.mp4` },
  { src: `/assets/videos/Angelia.mp4` },
  { src: `/assets/videos/Annabel Redd - Step Brother.mp4` },
  { src: `/assets/videos/Annie Archer nerd girl use bbc for first time.mp4` },
  { src: `/assets/videos/Arab - Noria- Saudi Hardcore Hardcore Porn.mp4` },
  {
    src: `/assets/videos/Arab Egyptian Girl Can't Stand the Dick of His Lover- Amateur Amateur Porn.mp4`,
  },
  { src: `/assets/videos/Arab Fuck- Saudi Amateur Amateur Porn.mp4` },
  { src: `/assets/videos/arab sex amateur.mp4` },
  { src: `/assets/videos/arabic sex.mp4` },
  { src: `/assets/videos/Aranic firi womens sex.mp4` },
  {
    src: `/assets/videos/Audrey Bitoni - Horny wife fucked by her husband's friend.mp4`,
  },
  { src: `/assets/videos/Audrey Bitoni - I Locked The Door.mp4` },
  { src: `/assets/videos/Ava Addams - Unfaithful Wife Punished.mp4` },
  {
    src: `/assets/videos/Ava Addams, Daisy Summers - Step Daughter And Step Mom.mp4`,
  },
  { src: `/assets/videos/Bailey Brooke - My Sister's Hot Friend.mp4` },
  {
    src: `/assets/videos/Battle For Big Breast Dominance - Angela White - EPORNER.mp4`,
  },
  {
    src: `/assets/videos/Bellesa House - Busty Babe Angela White Loves everything about Mick Blue & can't Wait to Fuck him - Pornhub.com.mp4`,
  },
  { src: `/assets/videos/Betty's Dream - Part 1 [Omitome].mp4` },
  { src: `/assets/videos/Big Tits Milf Love BBC Anal.mp4` },
  { src: `/assets/videos/BLACKED BIG  NATURAL COMPILATION.mp4` },
  { src: `/assets/videos/Blair Williams - I Can Do Anal Though.mp4` },
  {
    src: `/assets/videos/Busty Angela White Gets Fucked by Step-Son, S01EP06 (720).mp4`,
  },
  { src: `/assets/videos/Busty Japanese Secretary.mp4` },
  { src: `/assets/videos/Carmela Clutch - Take Over The Car Accident.mp4` },
  {
    src: `/assets/videos/Cassidy Klein, Chanel Preston, The Wettest Dream.mp4`,
  },
  {
    src: `/assets/videos/Cassidy Klein, Veronica Vain - The Day For Giving Thanks.mp4`,
  },
  {
    src: `/assets/videos/Celebration! ! Commemorative Work That Breaks Through 50 Ripe Comics! ! Up And Coming Mature Woman Humiliation! ! Original  Koshiyama Weakness Married Nampa Ntr Hot Spring.mp4`,
  },
  { src: `/assets/videos/Chanel Preston - Her First Big Sale 2.mp4` },
  { src: `/assets/videos/Chanel Preston - Stepmoms Special Frosting.mp4` },
  {
    src: `/assets/videos/Chanel Preston, Kristina Rose, Phoenix Marie - New Years Eve Party.mp4`,
  },
  { src: `/assets/videos/Cum In Me, Not On My Couch.mp4` },
  { src: `/assets/videos/Cytherea, Blind Experiment.mp4` },
  { src: `/assets/videos/Dakota Skye - Don't Fuck My Brother, Bitch!.mp4` },
  { src: `/assets/videos/Dani Daniels - Romantic Aggression 2, Scene 1.mp4` },
  { src: `/assets/videos/Dani Daniels, He Says, She Fucks.mp4` },
  {
    src: `/assets/videos/Darkside Intense Anal Sex with BBC - Angela white.mp4`,
  },
  { src: `/assets/videos/DC Superheros-Villians Compilation.mp4` },
  { src: `/assets/videos/Dinner at Castle Dimitrescu - Jackerman.mp4` },
  {
    src: `/assets/videos/Dirty With Father In Law, American Wife's Body Lovejoy - Megu Fujiura.mp4`,
  },
  {
    src: `/assets/videos/Dylan Phoenix Molly Jane, Big Tits On The Bottom Bunk.mp4`,
  },
  { src: `/assets/videos/Egypt P2- Egyptian Arab Arab Porn.mp4` },
  { src: `/assets/videos/Egyptian Threesome- Amateur Amateur Porn.mp4` },
  { src: `/assets/videos/Ella huges Shy Redheads Want Anal.mp4` },
  {
    src: `/assets/videos/Esperanza Gomez - I Take Out My Cock In Stepmom's Car.mp4`,
  },
  { src: `/assets/videos/Eva Notty - His Friend's Mom.mp4` },
  { src: `/assets/videos/Eva Notty - Mom's In Hot Water.mp4` },
  { src: `/assets/videos/Eva Notty - Pizza Party- Part 1.mp4` },
  { src: `/assets/videos/Eva Notty Milf Squad Vegas_ The Stakeout.mp4` },
  { src: `/assets/videos/Eva Notty, Gia Paige, Prom Pussy.mp4` },
  {
    src: `/assets/videos/Eva Notty, There Goes The Neighborhood Scoundrel.mp4`,
  },
  {
    src: `/assets/videos/Friends Recording Their Private Moments- Egyptian Amateur Porn.mp4`,
  },
  {
    src: `/assets/videos/Gabbie Carter - Desirable Brunette Gets Licked And Penetrated.mp4`,
  },
  { src: `/assets/videos/Gabbie Carter - pit-stop for an iced coffee.mp4` },
  {
    src: `/assets/videos/Gabbie Carter - Sexy Blonde Fucked By The Big Black Cock.mp4`,
  },
  { src: `/assets/videos/Gabbie Carter, LaSirena69 - Lucky Guy.mp4` },
  { src: `/assets/videos/Gabbie Carter, LaSirena69 - Perfect Wife.mp4` },
  {
    src: `/assets/videos/Gabbie Compilation - Anal, Blonde, Blowjob Porn - SpankBang.mp4`,
  },
  { src: `/assets/videos/Gabriela Lopez - Lopez Family Vacation.mp4` },
  { src: `/assets/videos/Gia Paige - I'm Not Leaving!.mp4` },
  { src: `/assets/videos/Girlsway Obsessed With Pussy.mp4` },
  {
    src: `/assets/videos/Hard Sex with Arab Milf-full Video Site Name on Video- Anal Anal Porn.mp4`,
  },
  { src: `/assets/videos/Hell's Sentence.mp4` },
  {
    src: `/assets/videos/Holly Hendrix, Mandy Muse - My Girlfriend's Phat Ass Roommate.mp4`,
  },
  {
    src: `/assets/videos/hot caretaker that takes ups a coach after her duty.mp4`,
  },
  {
    src: `/assets/videos/Hot Couple Home Made Part 1- Amateur Amateur Porn.mp4`,
  },
  {
    src: `/assets/videos/Hot Couple Home Made Part 2- Amateur Amateur Porn.mp4`,
  },
  { src: `/assets/videos/IHaveAWife.15.12.23.Leah.Gotti.mp4` },
  { src: `/assets/videos/In Egyptian Brothel.mp4` },
  { src: `/assets/videos/Interracial Double Penetration.mp4` },
  { src: `/assets/videos/Isabella De Santos - Hot Anal Latina.mp4` },
  { src: `/assets/videos/it's too big.mp4` },
  { src: `/assets/videos/It's Too Cute For.mp4` },
  {
    src: `/assets/videos/Japanese Wife Fucked All Day In Front Of Her Husband_.mp4`,
  },
  { src: `/assets/videos/Jasmine James - Jasmine's At The Laundromat.mp4` },
  {
    src: `/assets/videos/Jayden Jaymes - Big Twits in Uniform- He Comes to America!.mp4`,
  },
  { src: `/assets/videos/Jayden Jaymes - I Won't Tell The Boss.mp4` },
  { src: `/assets/videos/JJ Angela White.mp4` },
  { src: `/assets/videos/JJ cumshot compilation (1080).mp4` },
  {
    src: `/assets/videos/Julianna Vega, Mia Khalifa - Stepmom and Step-daughter.mp4`,
  },
  { src: `/assets/videos/Jynx Maze - Jynx's Juicy Pussy.mp4` },
  { src: `/assets/videos/Keisha Grey - Don't Touch Her 2.mp4` },
  {
    src: `/assets/videos/Keisha Grey - Trying to get her professor's attention.mp4`,
  },
  {
    src: `/assets/videos/Keisha Grey, Leah Gotti - Best Friends Share Everything.mp4`,
  },
  {
    src: `/assets/videos/Keisha Grey, Mandy Muse - Step-Sister's Play Tug of War With Boyfriend.mp4`,
  },
  { src: `/assets/videos/Kelsi Monroe - Banging That Hot Pussy.mp4` },
  { src: `/assets/videos/Kelsi Monroe - Kelsi Meets Mandingo.mp4` },
  {
    src: `/assets/videos/Kendra Lust - Big Tit MILF Star Kendra Lust Has A BBC Celebration With Dredd.mp4`,
  },
  { src: `/assets/videos/Kianna Dior - Your MILF is the Best.mp4` },
  { src: `/assets/videos/Kimmy Granger - Don't Forget To Fuck!.mp4` },
  {
    src: `/assets/videos/Kimmy Granger, Adriana Chechik - class for a hands-on demonstration .mp4`,
  },
  { src: `/assets/videos/King louie 2.mp4` },
  { src: `/assets/videos/King Louie 5.mp4` },
  { src: `/assets/videos/King Louie 6.mp4` },
  { src: `/assets/videos/King Louie 9.mp4` },
  {
    src: `/assets/videos/Lara Croft - Island Of The Sacred Beasts Part 1-3 [RadeonG3D].mp4`,
  },
  {
    src: `/assets/videos/Lara Croft - Island Of The Sacred Beasts Part 1-3 [RadeonG3D]_2.mp4`,
  },
  { src: `/assets/videos/Lara Croft - Womb Raider [RadRoachHD].mp4` },
  { src: `/assets/videos/Lara talks to her therapist.mp4` },
  { src: `/assets/videos/Lara's Capture full movie (TheRopeDude).mp4` },
  { src: `/assets/videos/Lauren Phillips - Busty Redhead MILF At Prison.mp4` },
  { src: `/assets/videos/Leah Gotti - Flexible Fuck_480.mp4` },
  { src: `/assets/videos/Leah Gotti - Tied Fantasy.mp4` },
  { src: `/assets/videos/Leah Gotti Wet Wild And Hot.mp4` },
  { src: `/assets/videos/LEAH GOTTI Working It.mp4` },
  { src: `/assets/videos/Lena Paul - Hot Stepmom.mp4` },
  { src: `/assets/videos/Lena Paul - Longtime Best Friend.mp4` },
  { src: `/assets/videos/Lennox Luxe Blacked.mp4` },
  {
    src: `/assets/videos/Lesbian Analingus - Milf, Blonde, Big Ass Porn - SpankBang.mp4`,
  },
  { src: `/assets/videos/LIKE WE'RE STILL TOGETHER.mp4` },
  { src: `/assets/videos/Lilly Ford - Father's Day Movie Night Surprise.mp4` },
  {
    src: `/assets/videos/Ma7ala 3anteel - for Full Video Check the Site Name in the Video.mp4`,
  },
  { src: `/assets/videos/Mandy Flores - Flirty Sister Learns A Lesson.mp4` },
  { src: `/assets/videos/Mandy Muse - Mandy's Anal Amusement.mp4` },
  {
    src: `/assets/videos/Marat Ab Labwa Teghwi Ibn Zougha O Tsalemlo Nafsaha- BBW BBW Porn.mp4`,
  },
  { src: `/assets/videos/Mea Melone - Lost In ZZ Episode 4.mp4` },
  { src: `/assets/videos/Melissa May Romi Rain, Room, Board and Bang.mp4` },
  {
    src: `/assets/videos/Mia Evans, Missy Luv - Snowballing Stepsister Secrets.mp4`,
  },
  {
    src: `/assets/videos/Mia Khalifa - Horny, First Threesome With Big Black Cocks.mp4`,
  },
  {
    src: `/assets/videos/Mia Khalifa - Quarterback sneak on that College pussy.mp4`,
  },
  { src: `/assets/videos/Mia Malkova - My Own Private Tryout.mp4` },
  {
    src: `/assets/videos/Mia Malkova, Natalia Starr - Let's Have a Threesome.mp4`,
  },
  { src: `/assets/videos/Mischievous Mamacita- Primera Nocha - Jackerman.mp4` },
  { src: `/assets/videos/Misspelled Episode 2 Part 1 [Omitome].mp4` },
  { src: `/assets/videos/Misspelled part 1 & 2.mp4` },
  { src: `/assets/videos/Molly Jane - You're married.mp4` },
  { src: `/assets/videos/My Egyptian Slut- Amateur Amateur Porn.mp4` },
  { src: `/assets/videos/My Wife's Fav Resort.mp4` },
  {
    src: `/assets/videos/My Younger Brother's Wife My Younger Brother's Wife Who Can't Refuse Sex (Misuzu Takeuchi).mp4`,
  },
  { src: `/assets/videos/Natasha Nice - Wealthy Widow.mp4` },
  { src: `/assets/videos/Nicole Aniston, The Perfect Maid 2.mp4` },
  { src: `/assets/videos/Nika Venom - Curvy Babe Needs Creampie.mp4` },
  { src: `/assets/videos/Nina North - The Make Up Exam.mp4` },
  { src: `/assets/videos/Our New Maid- Part One.mp4` },
  { src: `/assets/videos/Parkside Playdate - Jackerman.mp4` },
  { src: `/assets/videos/Passion-HD - Leah Gotti - Tempting Stepsister.mp4` },
  { src: `/assets/videos/Porn Habits.mp4` },
  { src: `/assets/videos/ragab mohamedy.mp4` },
  { src: `/assets/videos/Rasha and Rajab and the best nick.mp4` },
  { src: `/assets/videos/Remy BOB.mp4` },
  { src: `/assets/videos/Remy L. Anal.mp4` },
  { src: `/assets/videos/REMY LA CROIX (2).mp4` },
  { src: `/assets/videos/Remy La Croix Young  Glamorous.mp4` },
  { src: `/assets/videos/Remy La Croix.mp4` },
  { src: `/assets/videos/Remy Lacroix - 2.mp4` },
  { src: `/assets/videos/Remy Lacroix - Anal Hula Hoop.mp4` },
  { src: `/assets/videos/Remy Lacroix.mp4` },
  { src: `/assets/videos/Riley Nixon - Cant Get Enough.mp4` },
  { src: `/assets/videos/Riley Reid, Eva Lovia - Sluts In Stockings.mp4` },
  {
    src: `/assets/videos/Riley Reid_ My Personal Porn Star Plaything for the Night - Fan, Hotel, Client.mp4`,
  },
  {
    src: `/assets/videos/Riley Reid_s Academic Ambition_ Sucking and Fucking Her Way to Success - Sexy, Petite, College.mp4`,
  },
  { src: `/assets/videos/Riley Takes Monster Dick In Her Ass.mp4` },
  {
    src: `/assets/videos/Rion Izumi Gets Pounded Like A Bitch In Front Of Her Daughter.mp4`,
  },
  { src: `/assets/videos/Romi Rain - Romi Rains In A BBC.mp4` },
  { src: `/assets/videos/Rose Monroe - Staycation Sex Blues.mp4` },
  { src: `/assets/videos/Ryan Smiles, The Replacement.mp4` },
  {
    src: `/assets/videos/Sacred Beasts Final Edition [radeonG3D] [FRENCH-SUB].mp4`,
  },
  { src: `/assets/videos/Saddling Selina - Jackerman.mp4` },
  { src: `/assets/videos/Sadira's Blessing - Jackerman.mp4` },
  { src: `/assets/videos/Samantha Saint, The Perfect Maid 3.mp4` },
  { src: `/assets/videos/Sara Jay - Bring Me The Manager.mp4` },
  { src: `/assets/videos/Scarlet Red - Back for 2 Big Black Dicks.mp4` },
  { src: `/assets/videos/Selina's Sabotage - Jackerman.mp4` },
  { src: `/assets/videos/Sharomtat Alwaraa Egypt- Anal Anal Porn.mp4` },
  { src: `/assets/videos/She In Trouble LOL.mp4` },
  { src: `/assets/videos/She wants his black cock!.mp4` },
  {
    src: `/assets/videos/Sheena Ryder - Sheena In Stepmom Fucks Her Two Sons.mp4`,
  },
  { src: `/assets/videos/Sienna West - Sexy Teacher.mp4` },
  { src: `/assets/videos/Siri Dahl - Sweet Dinner For My Stepson.mp4` },
  {
    src: `/assets/videos/Skylar Vox, LaSirena69 - It Was The Fucking Realtor.mp4`,
  },
  { src: `/assets/videos/Sone385 Uncensored Boobs Ass (1080).mp4` },
  { src: `/assets/videos/Southern Hospitality Barnyard Bash - Jackerman.mp4` },
  {
    src: `/assets/videos/STARS-947 A Beautiful Wife Who Runs A Vacation Rental I.mp4`,
  },
  { src: `/assets/videos/Stay Away From My Daughter.mp4` },
  {
    src: `/assets/videos/stepMomsTeachSex - Stepmom & Stepson Share Bed & Fuck S7_E3.mp4`,
  },
  { src: `/assets/videos/Sunny Lane, The Masturbating Teacher.mp4` },
  { src: `/assets/videos/Sybil Stallone - Stepmom's Spring Cleaning.mp4` },
  { src: `/assets/videos/Tessa Lane - interracial.mp4` },
  { src: `/assets/videos/Tessa Lane 1.mp4` },
  { src: `/assets/videos/Tessa Lane Hiding.mp4` },
  { src: `/assets/videos/Tessa Lane.mp4` },
  { src: `/assets/videos/The Bordello [NYL][4K].mp4` },
  { src: `/assets/videos/The Break-Up.mp4` },
  { src: `/assets/videos/The Cuckold Compilation BLACKED.mp4` },
  { src: `/assets/videos/The Perfect Cell [Hincap].mp4` },
  { src: `/assets/videos/This Is What It Sounds Like When Moms Fuck.mp4` },
  {
    src: `/assets/videos/Tiny Bookworm Step Sister tries Sex - Kylie Quinn - Family Therapy - Alex Adams - Pornhub.com.mp4`,
  },
  {
    src: `/assets/videos/Two Big Tits Milf Share A BBC 2024 Ofleak - Angela White And Violet Myers.mp4`,
  },
  {
    src: `/assets/videos/Valentina Nappi - I'm Horny - Call an Ambulance!.mp4`,
  },
  { src: `/assets/videos/Valerie Kay - Hard Dick.mp4` },
  { src: `/assets/videos/Valerie Kay - Valerie Kay Saves the Day.mp4` },
  { src: `/assets/videos/Violet Myers - Double Penetration.mp4` },
  { src: `/assets/videos/Violet Myers - Playing With My Latina Friend.mp4` },
  {
    src: `/assets/videos/Violet Parr & Helen Parr - The Fitting Room [Niisath].mp4`,
  },
  { src: `/assets/videos/Violet Starr - No Fucking Spoilers.mp4` },
  {
    src: `/assets/videos/Violet Starr, Vanessa Sky - Spa night turns into a hardcore anal threesome.mp4`,
  },
  { src: `/assets/videos/White Ass.mp4` },
  {
    src: `/assets/videos/Baebz.17.01.11.Leah.Gotti.Flexible.Fuck.XXX.1080p.MP4-KTR.mkv`,
  },
];

export default function Gallery() {
  // Define how many files of each type
  const jpgCount = 172;
  const wepbCount = 2;
  const gifCount = 17;

  // Create all filenames automatically
  const jpgs = Array.from({ length: jpgCount }, (_, i) => `jpg (${i + 1}).jpg`);
  const webps = Array.from(
    { length: wepbCount },
    (_, i) => `webp (${i + 1}).webp`
  );
  const gifs = Array.from({ length: gifCount }, (_, i) => `gif (${i + 1}).gif`);

  // Combine them all into one array
  const [images] = useState([...jpgs, ...webps, ...gifs]); // No need to update, so no setImages

  const [selected, setSelected] = useState(null); // for lightbox

  const [showButton, setShowButton] = useState(false); // State to track button visibility

  const [dark, setDark] = useState(false); // State to track dark mode

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setShowButton(window.scrollY > 300);
    };
  }

  const [filter, setFilter] = useState("all");

  const filteredImages = images.filter((img) => {
    if (filter === "jpg") return img.endsWith(".jpg");
    if (filter === "gif") return img.endsWith(".gif");
    if (filter === "webp") return img.endsWith(".webp");
    return true; // "all" → no filter
  });

  const [loaded, setLoaded] = useState(false); // ✅ flag

  // Load from localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("galleryFilter");
      if (saved) setFilter(saved);
      setLoaded(true); // ✅ mark as loaded
    }
  }, []);

  // Save to localStorage *after* initial load
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("galleryFilter", filter);
    }
  }, [filter, loaded]);

  return (
    <div className="mt-10 px-4 mx-5">
      <button
        className={`${
          dark ? "bg-black text-white" : "bg-white text-black"
        } px-3 py-1 rounded mb-4 border border-gray-300 hover:bg-gray-200 transition`}
        onClick={() => setDark(!dark)}
      >
        Toggle Theme
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">
        📸 GAIA Genesis Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {videos.map((v, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            <video
              src={v.src}
              thumbs={v.thumb}
              controls
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mb-8">
        Total images: {filteredImages.length} of {images.length} images
      </p>

      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`${
            filter === "all" ? "bg-blue-600" : "bg-gray-800"
          } px-3 py-1 text-white rounded`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("jpg")}
          className={`${
            filter === "jpg" ? "bg-blue-600" : "bg-gray-800"
          } px-3 py-1 text-white rounded`}
        >
          JPG
        </button>
        <button
          onClick={() => setFilter("gif")}
          className={`${
            filter === "gif" ? "bg-blue-600" : "bg-gray-800"
          } px-3 py-1 text-white rounded`}
        >
          GIF
        </button>
        <button
          onClick={() => setFilter("webp")}
          className={`${
            filter === "webp" ? "bg-blue-600" : "bg-gray-800"
          } px-3 py-1 text-white rounded`}
        >
          WEBP
        </button>
      </div>

      {/* Masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-10 space-y-4">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg break-inside-avoid cursor-pointer"
            onClick={() => setSelected(`/assets/images/${img}`)}
          >
            <Image
              src={`/assets/images/${img}`}
              alt={`Gallery ${index + 1}`}
              width={600} // fixed width
              height={0} // let height auto-adjust
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </div>
        ))}
      </div>
      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="max-h-[90vh]">
            <Image
              src={selected}
              alt="Selected"
              width={1200}
              height={800}
              className="w-auto h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-gray-800 text-white px-3 py-2 rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}
