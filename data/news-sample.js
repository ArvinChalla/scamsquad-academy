/* ========================================================================
   news-sample.js
   SAMPLE ONLY, to show how the news screen will look.

   The real news comes from data/news.json, made by the Python scripts in
   backend/news/ from official sources only (the FTC, the FBI, the Postal
   Inspection Service, the CFPB, CISA and four state attorneys general).
   Each item uses human-written words for each age group, and a grown-up
   approves every batch before it goes live.

   These sample items are made up and say so on screen. They only show
   when news.json has no items and the game runs on this computer
   (localhost). On the real site, an empty news.json shows "No new
   warnings this week" instead.

   In this file:
     NEWS_SAMPLE   the made-up items
   ======================================================================== */

export const NEWS_SAMPLE = {
  updated: "Sample",
  items: [
    {
      icon: "📱",
      category: "messages",
      date: "Sample",
      title: "Fake toll texts are back",
      summary: "Texts say you owe a toll and must pay today. Most of these are fake.",
      doThis: "Don't tap the link. Tell a parent, or another adult you trust. They can check the toll account on the real site.",
      source: "Example: FTC consumer alert",
      url: "https://consumer.ftc.gov/consumer-alerts"
    },
    {
      icon: "🎮",
      category: "gaming",
      date: "Sample",
      title: "\"Free skins\" giveaways steal logins",
      summary: "Videos promise free skins if you log in on a website. The site keeps your password.",
      doThis: "Only log in inside the real game or app.",
      source: "Example: game company warning",
      url: "https://en.help.roblox.com/"
    },
    {
      icon: "💜",
      category: "people",
      date: "Sample",
      title: "Someone threatening you online? Help is free",
      summary: "If anyone asks for photos or threatens you, it is not your fault. There is free, private help.",
      doThis: "Tell a parent, or another adult you trust. Visit takeitdown.ncmec.org.",
      source: "Example: NCMEC",
      url: "https://takeitdown.ncmec.org"
    }
  ]
};
