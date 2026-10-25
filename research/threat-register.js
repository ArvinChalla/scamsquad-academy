/* The threat register's list and its filters. Kept in its own file because
   the site's security policy does not run scripts written inside a page. */
const CLASSES = [
  {
    code:"PRED", name:"Predatory contact &amp; sexual exploitation",
    desc:"Adults, and increasingly organized criminal networks, making contact with a child in order to exploit them. The single most dangerous class by outcome, and the one where reporting volumes are rising fastest.",
    items:[
      {id:"PRED-01", name:"Financial sextortion", ev:"doc", ages:["13-15","16-18"],
       where:["Instagram","Snapchat","Discord","WhatsApp","Telegram","Wizz"],
       def:"An organized scam, not a lone predator: a fake teenage girl obtains an explicit image, then immediately demands money under threat of sending it to the victim's contacts.",
       how:["Contact is made posing as an attractive peer; in 70% of cases the perpetrator sends a fake image first to induce reciprocity","Threat follows the image almost immediately, the FBI notes it can take as little as five minutes","Payment demanded in gift cards, CashApp, Venmo, PayPal or crypto, wrapped in countdown-timer urgency","Paying rarely ends it: 27% of victims who paid reported continued demands"],
       sig:["Sudden panic around the phone, especially at night","Attempts to obtain gift cards or move money quickly","A brand-new online 'girlfriend' the child cannot describe consistently","Scripted, formulaic threat language that recurs verbatim across unrelated victims"],
       src:"NCMEC recorded over 50,000 financially motivated sextortion reports in 2025 (~137/day), up from 36,000+ in 2024. Thorn's analysis of 15M+ CyberTipline reports found ~90% of victims were boys aged 14&ndash;17; 47% of reports traced to Nigeria and C&ocirc;te d'Ivoire. IWF logged 397 cases in 2025, up 127%, 98% of victims boys 14&ndash;17."},

      {id:"PRED-02", name:"Grooming for sexual abuse", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Snapchat","Roblox","Minecraft","Fortnite","Instagram","Discord"],
       def:"A slow trust-building process ending in solicited images or an in-person meeting. Distinguished from sextortion by patience, weeks or months, not minutes.",
       how:["Rapport built through compliments, feigned shared interests and constant attention","Progressive isolation from family and offline friends","Migration off the contact platform to an encrypted or auto-deleting app","Material inducements, NCMEC names gift cards, alcohol, drugs, lodging, transport and food; in-game currency plays the same role"],
       sig:["A friendship that formed fast and lives entirely inside one app","Secrecy framing and normalization language: 'this is what people who like each other do'","Unexplained gifts, currency or account balances","Reluctance to attend an activity the contact has access to"],
       src:"UK NSPCC data on 2,111 grooming offences with an identifiable platform: 40% involved Snapchat, 9% WhatsApp, 9% Facebook/Instagram combined. NCMEC online-enticement reports rose ~300% between 2021 and 2023."},

      {id:"PRED-03", name:"Sadistic extortion, \"the Com\" and 764", ev:"doc", ages:["10-12","13-15"],
       where:["Discord","Telegram","Roblox","Minecraft","Snapchat"],
       def:"Violent online networks, many of whose members are themselves minors, that groom children into producing abuse material, self-harm and animal cruelty, then use it as permanent leverage.",
       how:["Recruiters target ages 11&ndash;25 through apps popular with children, often opening with a romantic or friendly relationship","Once compromising material exists, demands escalate rather than stop","Compiled victim material is kept in so-called 'lorebooks' for ongoing coercion","Doxxing, swatting and false police reports are used to punish victims who try to disclose"],
       sig:["Scars or fresh cuts in patterns; long sleeves in warm weather","Unexplained injury to a household pet","Sudden total withdrawal and appearance neglect","References to 'proving loyalty' to an online group"],
       src:"IC3 PSA 250723-3 describes The Com's three subsets (Hacker, IRL, Extortion). FBI advisories put typical victims at 10&ndash;17, disproportionately underage girls and youth already struggling with depression, eating disorders or suicidal ideation. ISD documents at least 10 arrests since 2021 across five countries. Europol has flagged 4,340 URLs tied to the network."},

      {id:"PRED-04", name:"Peer pressure toward self-generated imagery", ev:"doc", ages:["13-15","16-18"],
       where:["Snapchat","Instagram","iMessage","group chats"],
       def:"Images a teenager produces themselves under social pressure or in a perceived relationship, which then circulate beyond the intended recipient.",
       how:["Normalization inside a peer group makes refusal socially costly","The recipient is often not who the teen believes: 30% thought the recipient was an adult, 22% had met them online","Onward sharing turns a private image into permanent circulating material"],
       sig:["Talk of sharing being 'normal' or expected in a relationship","A relationship conducted entirely through disappearing messages","Distress following a breakup or a falling-out with a friend group"],
       src:"Thorn 2025: 1 in 11 minors aged 9&ndash;17 shared a nude of themselves (1 in 9 among 13&ndash;17s); 23% of 13&ndash;17s believed it was normal among peers. IWF found one-third of imagery involving 14&ndash;17s was self-generated."},

      {id:"PRED-05", name:"Adult content inside children's games", ev:"emg", ages:["10-12","13-15"],
       where:["Roblox private servers","user-generated game platforms"],
       def:"Private servers inside child-focused platforms repurposed to host sexual content, used as both exposure vector and grooming venue.",
       how:["Servers are built and shared through off-platform invite chains, mostly Discord","Discovery and moderation lag behind creation rate","Contact made inside the space moves off-platform quickly"],
       sig:["Invite links to private servers arriving from outside the game","Game names or place-IDs the child won't show","Off-platform Discord servers tied to a game the child plays"],
       src:"Documented in academic and journalistic sources (CHI 2025 paper on Roblox moderation; LSE Media analysis, Dec 2025) and in state AG actions, rather than in a law-enforcement dataset with published volumes."}
    ]
  },
  {
    code:"AI", name:"Synthetic media &amp; AI-mediated harm",
    desc:"The newest class and the fastest-moving. Two distinct problems live here: AI used as a weapon against a child, and AI systems that harm a child through direct interaction.",
    items:[
      {id:"AI-01", name:"Nudify apps and peer deepfake nudes", ev:"doc", ages:["13-15","16-18"],
       where:["school networks","group chats","Snapchat","Instagram"],
       def:"A classmate's ordinary photo run through an app that generates a fake nude, then circulated at school. The victim never produced an image at all.",
       how:["Consumer apps have removed nearly all technical skill from the process","Motives range from perceived humor to targeted bullying and extortion","Most schools have no crisis plan, no staff training, and no proactive education on it"],
       sig:["Sudden refusal to attend school with no stated reason","Talk of images 'of' a classmate circulating","A cluster of students abruptly excluding one peer"],
       src:"Stanford HAI (52 interviews, 4 districts, 2024&ndash;25) found incidents geographically widespread; a majority of surveyed minors already knew it was illegal and did it anyway. The TAKE IT DOWN Act (signed 19 May 2025) covers AI forgeries and requires 48-hour platform removal; FTC enforcement began 19 May 2026, with penalties up to $53,088 per violation. Minnesota's nudify-app ban is currently being challenged in court by xAI."},

      {id:"AI-02", name:"AI-generated child sexual abuse material", ev:"doc", ages:["6-9","10-12","13-15","16-18"],
       where:["generative image and video tools","subscription platforms"],
       def:"Abuse imagery generated or altered by AI, including material built from a real child's ordinary photos. Hash-matching detection largely fails because every generation is unique.",
       how:["Existing imagery altered by AI accounted for the largest single share of NCMEC's 2025 AI reports","Nudification apps and agentic AI systems have lowered the barrier to offending","Platform self-reporting badly lags: NCMEC staff manually flagged 158,000+ AI files while platforms flagged ~11,000"],
       sig:["Detection here is institutional, not parental, the practical signal is a child's ordinary photos being scraped from public profiles"],
       src:"NCMEC generative-AI reports: ~4,700 (2023) &rarr; ~67,000 (2024) &rarr; 400,000+ (2025), per NCMEC's own published figures. A larger 2025 total (~1.5M) circulates using a broader &ldquo;AI nexus&rdquo; definition that folds in bulk automated scanning reports, a definitional dispute, not a correction. IWF confirmed 3,443 AI-generated CSAM videos in 2025, a 260-fold rise; 65% were assessed as the most severe category, against 43% of real-child material."},

      {id:"AI-03", name:"AI companion chatbots", ev:"emg", ages:["13-15","16-18"],
       where:["Character.AI","general-purpose assistants","companion apps"],
       def:"Conversational AI used as a primary emotional relationship. The documented risks are dependency, harmful guidance during crisis, and sexual content reaching minors.",
       how:["Age gates are commonly defeated with a false birthdate","Engagement-optimized design rewards prolonged, emotionally intense conversation","Bots impersonating child-brand characters have been alleged to engage in sexual talk or trivialize self-harm"],
       sig:["Serious problems discussed with an AI rather than a person","Distress when access is interrupted","Describing an AI as their closest relationship"],
       src:"Common Sense Media (teens 13&ndash;17, July 2025): 72% have used an AI companion; over half use one multiple times a month; 1 in 3 find AI conversation as satisfying or more satisfying than real friendship. The FTC opened a 6(b) inquiry on 11 Sept 2025 into Alphabet, Character Technologies, Meta, OpenAI, Snap and xAI. Garcia v. Character Technologies, Raine v. OpenAI and Kentucky's AG suit are all pending, allegations, not findings."},

      {id:"AI-04", name:"Voice cloning family-distress scams", ev:"emg", ages:["10-12","13-15","16-18"],
       where:["phone calls","voice chat scraping","public video"],
       def:"A few seconds of a child's voice, from a public post or game voice chat, cloned to call a parent or grandparent with a fabricated emergency.",
       how:["Voice source is scraped from openly public social or streaming content","The call manufactures panic to bypass verification","Payment is demanded immediately, usually in an irreversible form"],
       sig:["A family that has never agreed a verification phrase","Publicly discoverable voice content tied to a named child","An incoming demand that forbids hanging up or calling back"],
       src:"FBI IC3 2025 attributes $893M in losses across 22,364 complaints to AI-enabled fraud overall, of which voice-cloning distress scams account for $5M+ reported. Larger figures circulating in consumer coverage could not be traced to a primary source."},

      {id:"AI-05", name:"AI-enabled toys", ev:"emg", ages:["6-9","10-12"],
       where:["connected toys","kids' robots","smart speakers"],
       def:"Toys with conversational AI marketed to children as young as three, tested and found to give unsafe guidance and to retain conversations the child was told were private.",
       how:["Testing found toys giving instructions involving matches and knives, and two engaging in sexually explicit topics","Toys told children conversations were 'safe secrets' while corporate backends retained and could access them","Parental controls in tested products lacked transcripts, time limits and monitoring"],
       sig:["A child repeating guidance no adult gave them","A toy's privacy policy disclosing third-party sharing or multi-year biometric retention"],
       src:"US PIRG Education Fund tested five AI toys (Curio Grok, FoloToy Kumma, Miko 3, Robot MINI, Alilo Smart AI Bunny). FoloToy suspended Kumma sales after the findings. S.5171, the Children's Artificial Intelligence Toy Safety Act of 2026, was introduced in the 119th Congress."},

      {id:"AI-06", name:"AI-generated personas at scale", ev:"emg", ages:["13-15","16-18"],
       where:["Instagram","Snapchat","dating-adjacent apps","game chat"],
       def:"Fake profiles built with AI-generated photos and scripted conversation, letting a single operator run persuasion against many targets at once.",
       how:["AI imagery removes the reverse-image-search defense that used to expose catfishing","Scripted conversation flows allow industrial scale","Feeds directly into the sextortion and romance-fraud pipelines"],
       sig:["A profile whose photos have no history anywhere else","Conversation that never adapts to specific things the child says","Refusal or inability to appear on an unscripted live video call"],
       src:"FBI IC3 2025 records $7.228B in crypto confidence-fraud losses across 61,559 complaints, up 48% in volume; the data is not broken out by victim age, so a minor-specific figure is not available."}
    ]
  },
  {
    code:"FIN", name:"Scams &amp; fraud",
    desc:"The highest-volume class by a wide margin. Most of it is not sophisticated, it exploits impatience, trust and the desire for status inside a game economy.",
    items:[
      {id:"FIN-01", name:"Free-currency generators", ev:"doc", ages:["6-9","10-12","13-15"],
       where:["Roblox","Fortnite","Minecraft","search results","YouTube"],
       def:"Sites promising free Robux, V-Bucks or Minecoins. There is no legitimate mechanism for any of them; every one is a front for something else.",
       how:["'Verification' tasks: install an app, complete a survey, add a browser extension","Hidden-subscription traps built around a small 'verification fee' or free trial that auto-renews","Fake platform login pages that capture credentials and stored payment methods"],
       sig:["Unfamiliar browser extensions or newly installed 'helper' apps","Small recurring card charges from unrecognized merchants","Search or watch history full of generator sites and tutorials"],
       src:"Documented consistently across Malwarebytes, McAfee and Malwaretips 2025&ndash;2026 reporting. McAfee's flat statement holds for every platform: no third-party service can generate premium currency."},

      {id:"FIN-02", name:"Trust trades and middleman scams", ev:"doc", ages:["6-9","10-12","13-15"],
       where:["Roblox","Adopt Me!","CS2 / Steam","Discord"],
       def:"The oldest structure in the register: give first, and the other side promises to give back. They do not.",
       how:["'Send yours and I'll send mine' framed as trust-building","A self-appointed 'middleman' holds both sides of a trade and disappears","Over/underpay tricks that exploit confusing trade interfaces","'Loans' of currency or items from a brand-new friend, never repaid"],
       sig:["An inventory that emptied overnight","A new in-game friend who talks mostly about trades","Trades being coordinated in a Discord server rather than in-game"],
       src:"Documented across Roblox scam taxonomies and five independent skin-trading marketplaces. This is vendor and community sourcing rather than government data, directionally reliable, not statistically authoritative."},

      {id:"FIN-03", name:"Account and item theft (\"beaming\")", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Roblox","Steam","resale marketplaces"],
       def:"Hijacking a game account specifically to strip and resell its inventory, feeding a large secondary market.",
       how:["Typosquatted domains using character substitutions and near-miss spellings","Tricking a victim into exporting a browser session file under a pretext such as an 'avatar renderer'","SIM swapping to intercept two-factor codes","Fraudulent account-recovery claims to platform support using forged evidence"],
       sig:["Inventory missing after clicking a link from a 'friend'","Password-reset or new-device emails the child didn't trigger","Requests to screen-share during a trade"],
       src:"Vice documented one victim losing roughly $500,000 in items and a single virtual item selling for $13,605. In April 2026 Malwarebytes and Bitdefender reported a Ukraine-based group that examined 610,000+ Roblox accounts using stolen session cookies between Oct 2025 and Jan 2026, selling 357+ accounts for roughly $225,000&ndash;$250,000; three suspects aged 19&ndash;22 were arrested in Lviv."},

      {id:"FIN-04", name:"Panic phishing (\"verify or be banned\")", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Roblox","Discord","Fortnite","email"],
       def:"A fake system message claiming imminent suspension, engineered so the child's attempt to prove innocence is what hands over the account.",
       how:["Message impersonates platform moderation or support","Countdown or 'final warning' framing removes deliberation","Spoofed login page captures credentials or session tokens"],
       sig:["A child anxious about being 'reported' or 'banned'","Login pages on domains that are one character off","Sudden loss of access shortly after a moderation-looking message"],
       src:"Documented as a standardized template across Roblox, Discord and Fortnite in 2025&ndash;2026 security reporting."},

      {id:"FIN-05", name:"Discord Nitro and QR login scams", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Discord","compromised servers","hijacked invite links"],
       def:"Free-premium bait delivered by DM or by a compromised server bot, including abuse of Discord's genuine QR login feature to take over a session outright.",
       how:["'Extra Nitro' DMs linking to spoofed login pages","QR codes that, when scanned, authorize the attacker's session rather than granting anything","Compromised server bots mass-spamming malicious links","Hijacked invite links reclaimed after a server's original invite expires"],
       sig:["Scanning a QR code sent by a stranger","A friend's account suddenly DMing everyone the same link","Unrecognized authorized sessions in account settings"],
       src:"Kaspersky telemetry (Jan&ndash;Oct 2025) detected 20M+ attempted gaming-platform attacks, of which 18.56M abused Discord specifically, a 14x increase over 2024. A separate 2.05M phishing attempts impersonated Steam, PlayStation and Xbox."},

      {id:"FIN-06", name:"Marketplace and resale fraud", ev:"doc", ages:["13-15","16-18"],
       where:["Depop","Vinted","social marketplace posts","ticket resale"],
       def:"Non-delivery, bait-and-switch and counterfeit goods on the resale platforms teenagers actually use for clothes, sneakers and tickets.",
       how:["Payment moved off-platform to defeat buyer protection","Item swapped for a counterfeit or inferior version","Phishing DMs claiming 'a problem with your payment' with a fake protection link"],
       sig:["A seller insisting on a payment app instead of the platform's checkout","Pressure to complete a purchase before an event or drop","No buyer-protection record for a purchase the teen has already paid for"],
       src:"Pattern documented consistently across 2025&ndash;2026 consumer-security reporting and BBB alerts; no verified age-segmented loss total for these specific platforms was found."},

      {id:"FIN-07", name:"Fake job offers and fake-check scams", ev:"doc", ages:["16-18"],
       where:["TikTok","Instagram ads","job boards","DM outreach"],
       def:"Fabricated jobs aimed at students and first-time job seekers, usually structured around a check that will bounce after the teen has already wired money back.",
       how:["A check is sent, the teen deposits it and is asked to wire back a 'supply fee' or 'equipment cost'","The check clears provisionally, then bounces, the teen owes the full amount","Some 'jobs' are reshipping fronts that make the teen a link in a fraud chain"],
       sig:["A job offer with no interview and no verifiable company","Any arrangement where money flows out before it flows in","Instruction to keep the arrangement confidential"],
       src:"Documented across 2025&ndash;2026 reporting from Bitdefender, KOMO and TechRadar. BBB found employment scams carried a $1,819 median loss among 18&ndash;24s."},

      {id:"FIN-08", name:"Money mule recruitment", ev:"doc", ages:["16-18"],
       where:["social media","gaming platforms","messaging apps"],
       def:"Teenagers recruited to receive and forward payments, becoming launderers, and potential defendants, usually without understanding what they are moving.",
       how:["Recruiters pose as IT services or 'gaming account upgrade' companies offering easy money for little effort","The teen accepts payments, keeps a cut, converts the rest to crypto and forwards it","In the FBI's Omaha case the underlying 'product' was payment for child sexual abuse material"],
       sig:["Money moving through the teen's account far exceeding any plausible income","A 'job' consisting entirely of receiving and forwarding payments","Multiple new payment-app accounts"],
       src:"FBI Omaha advisory on mule schemes targeting teenagers and young adults. The FBI stresses that unwitting participation still exposes a minor to federal money-laundering and wire-fraud investigation. DOJ has taken action against 3,000+ money mules in a single initiative."},

      {id:"FIN-09", name:"Cash-flip and \"squaring up\" scams", ev:"doc", ages:["13-15","16-18"],
       where:["Instagram","TikTok","Cash App","Snapchat"],
       def:"'Send $50, get $500 back.' Either a straightforward theft, or a recruitment funnel into mule work using the teen's own account.",
       how:["Fabricated screenshots of prior 'wins' provide social proof","A small first payment is sometimes returned to build trust before a larger ask","The secondary variant routes stolen funds through the teen's account"],
       sig:["Screenshots of payouts shared as proof","Small outbound payments to unknown handles","Sudden unexplained inbound funds"],
       src:"Documented by Cash App's own consumer education and 2026 scam catalogs."},

      {id:"FIN-10", name:"Crypto and pump-scheme recruitment", ev:"doc", ages:["16-18"],
       where:["Discord","Telegram","social media","trading apps"],
       def:"Fake investment clubs promoted on social media that move recruits to encrypted messaging, then coordinate buying to inflate a price before insiders sell.",
       how:["Public recruitment, private execution, the group moves to Telegram or Discord immediately","Coordinated purchases of low-priced stocks or tokens inflate the price","Insiders exit; recruits hold the loss"],
       sig:["Membership in a private 'trading group' with an entry requirement","Coordinated buy instructions with a specific timestamp","Losses framed as 'the group got rugged'"],
       src:"IC3 PSA I-070325 documented at least a 300% increase in ramp-and-dump complaints from 2024 through mid-2025. BBB found crypto scams had a 60% victimization rate and $1,483 median loss among young reporters."}
    ]
  },
  {
    code:"MON", name:"Gambling mechanics &amp; predatory monetization",
    desc:"Not fraud in the legal sense, these are the intended designs of legitimate products, engineered to extract money and attention from people who are not equipped to evaluate the odds.",
    items:[
      {id:"MON-01", name:"Third-party skin gambling", ev:"doc", ages:["13-15","16-18"],
       where:["CS2 / Steam skins","third-party gambling sites"],
       def:"Betting real-value in-game items on external sites with no age verification. Structurally identical to casino gambling, categorized as 'trading'.",
       how:["Items are transferred out of the game client to a third-party site","No meaningful age gate; entry is via a game account the child already has","Losses are invisible to a parent watching bank statements, the currency is items"],
       sig:["Frequent item transfers to accounts that aren't friends","Chasing behavior after a loss","An item inventory whose value swings wildly"],
       src:"TrustPlay Skin Gambling Report 2025 (1,530 gamers, Nov 2025): 43.5% of skin gamblers started before 18, most commonly at 16, earliest reported at 13. 76.1% of underage gamblers' parents were unaware. 79.4% showed clinical problem-gambling markers; 72.2% lost money overall, average loss over $1,100. UK government review identified 50+ active sites with 6.9M visits in Feb 2025."},

      {id:"MON-02", name:"Loot boxes", ev:"doc", ages:["6-9","10-12","13-15","16-18"],
       where:["most major games with in-app purchase"],
       def:"Randomized paid rewards inside the game itself, the mechanism that normalizes variable-ratio spending before a child ever encounters a gambling site.",
       how:["Odds are often undisclosed or buried","Purchases use a laundered currency so real cost is obscured","Rarity tiers manufacture social status inside the game"],
       sig:["Repeated small purchases rather than one large one","Spending spikes around limited-time events","Distress tied to not obtaining a specific item"],
       src:"Cognosphere/HoYoverse paid a $20M FTC settlement over selling loot boxes to under-16s without adequate disclosure or consent; the order requires parental consent for under-16 purchases and mandatory odds disclosure. Belgium and the Netherlands have implemented bans; Brazil, Singapore and Australia have laws or reviews in progress."},

      {id:"MON-03", name:"Streak and FOMO design", ev:"doc", ages:["6-9","10-12","13-15","16-18"],
       where:["social apps","games","learning apps"],
       def:"Interface patterns built on loss aversion, streaks, countdowns, expiring rewards, that make disengaging feel like losing something already owned.",
       how:["Streak counters convert a habit into a possession the child fears losing","Countdown timers on cosmetic items manufacture urgency","Forced-continuity subscriptions make cancellation harder than signup"],
       sig:["Anxiety about missing a day rather than about the activity itself","Device use timed around a reset rather than around interest","Resistance to a break framed as 'I'll lose my streak'"],
       src:"Fairplay has petitioned the FTC over manipulative design in children's games. Epic Games' $245M FTC settlement specifically covered dark patterns leading to unauthorized charges in Fortnite."},

      {id:"MON-04", name:"Unauthorized in-app purchases", ev:"doc", ages:["6-9","10-12"],
       where:["iOS","Android","console stores"],
       def:"A young child spending real money on a stored payment method, with parental controls that are difficult enough to configure that many families never complete them.",
       how:["Payment credentials persist across sessions without re-authentication","Parental controls require lengthy setup and have documented bypasses","Notification requirements are inconsistently honored"],
       sig:["Card charges from app stores with no matching conversation","A child who knows the device passcode","Parental controls configured but showing gaps"],
       src:"A coalition FTC complaint against Apple (19 Aug 2025) alleges Screen Time requires more than 20 steps to configure, contains bypass bugs, and fails to send required notifications. Historical FTC enforcement against Apple, Amazon and Google established the underlying pattern."},

      {id:"MON-05", name:"Ad fraud and fake children's apps", ev:"doc", ages:["6-9","10-12"],
       where:["Google Play","App Store"],
       def:"Apps published as children's games whose real function is to generate fraudulent ad revenue in the background, sometimes alongside malware.",
       how:["Polished child-facing front ends conceal hidden ad injection","Distribution through official stores lends legitimacy","Removal happens only after the download base is already large"],
       sig:["Battery drain and data use disproportionate to a simple game","Ads appearing outside the app","A publisher with many near-identical titles"],
       src:"Check Point's Tekya clicker malware was found in 56 Google Play apps, 24 of them polished children's games, with over 1 million downloads before removal. Malwarebytes documented 77 malicious apps removed in Aug 2025 and 224 in a Sept 2025 ad-fraud campaign."}
    ]
  },
  {
    code:"TECH", name:"Malware &amp; account compromise",
    desc:"Children are a preferred malware audience for one reason: wanting to cheat at a game creates a willingness to disable security warnings and run an unsigned executable.",
    items:[
      {id:"TECH-01", name:"Cheat, mod and executor malware", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Roblox executors","Minecraft mods","aimbots","skin changers"],
       def:"The single largest malware vector aimed at this age group. The tool works, or appears to, and installs an infostealer alongside it.",
       how:["Delivery is framed as a cheat, mod menu, aimbot, skin changer or FPS unlocker","Users are instructed to disable antivirus 'because it's a false positive'","Payload harvests browser passwords, session cookies, Discord and game tokens, crypto wallets and VPN credentials"],
       sig:["Antivirus exclusions or real-time protection disabled","New .jar or .exe files in game mod folders","Accounts logging in from unfamiliar locations days later"],
       src:"Flare Research (53,896 infected devices, Jun&ndash;Aug 2025) found 41.47% of all infostealer infections originated from gaming-related files, over half involving cheats and mod menus. Named families in 2025&ndash;2026 campaigns include RedLine, Lumma, Vidar, Raccoon and Arcane. A March 2025 GitHub campaign infected 1,500+ devices through fake Minecraft mods."},

      {id:"TECH-02", name:"Cracked games and fake installers", ev:"doc", ages:["13-15","16-18"],
       where:["torrent sites","Discord file shares","MediaFire links"],
       def:"Pirated or 'repacked' versions of paid games carrying loaders that install stealers, remote access tools and backdoors.",
       how:["The game itself often runs, delaying suspicion","Loaders chain multiple payloads, a stealer plus a RAT plus a backdoor","Distribution through file-hosting links shared in gaming communities"],
       sig:["Games installed outside official launchers","Unexpected outbound network activity","Security software repeatedly disabled or uninstalled"],
       src:"Malwarebytes (June 2026) traced a RenEngine loader delivering the ARC infostealer plus Rhadamanthys, AsyncRAT and XWorm through cracked copies of Far Cry, Need for Speed, FIFA and Assassin's Creed, over 400,000 devices globally, ~30,000 in the US."},

      {id:"TECH-03", name:"YouTube and Discord tutorial lures", ev:"doc", ages:["10-12","13-15"],
       where:["YouTube","Discord servers","comment sections"],
       def:"Tutorial videos and community posts that hand a child the malware in the description link, with the video itself serving as the trust signal.",
       how:["Video demonstrates a working cheat; the link delivers something else","Comment sections are seeded with fake confirmations","Discord servers built around a game act as distribution hubs"],
       sig:["Watch history full of hack, aimbot or unlocker tutorials","Downloads from link shorteners and file hosts","Membership in servers named after cheats rather than games"],
       src:"McAfee (Jan 2025) documented YouTube tutorial videos delivering Lumma Stealer through Minecraft, Roblox, Fortnite, Apex Legends and Call of Duty lures. Kaspersky tracked Arcane spreading via YouTube and Discord since Nov 2024."},

      {id:"TECH-04", name:"Session cookie and token theft", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["all major game and social platforms"],
       def:"The dominant account-takeover method now: steal the active session rather than the password, which defeats two-factor authentication entirely.",
       how:["An infostealer or a pretext ('export this file for the avatar renderer') captures the session token","The attacker resumes the session without ever seeing a password","Password changes alone do not always end a stolen session"],
       sig:["Account activity while the child is asleep or at school","Unrecognized entries in a platform's active-sessions list","Access lost despite two-factor being enabled"],
       src:"The April 2026 Roblox case, 610,000+ accounts examined via stolen session cookies, is the clearest documented instance. Current reporting treats this as having largely supplanted classic credential stuffing for gaming accounts."},

      {id:"TECH-05", name:"Credential stuffing and account resale", ev:"doc", ages:["13-15","16-18"],
       where:["game accounts","account marketplaces","forums"],
       def:"Reused passwords tested at scale against game platforms, with successful accounts sold on markets that present themselves as legitimate resellers.",
       how:["Credentials from unrelated breaches are replayed against game logins","Accounts with linked payment methods and rare items carry the highest resale value","Marketplaces normalize the trade by framing stolen accounts as 'resales'"],
       sig:["The same password used across game, email and school accounts","Sudden lockouts across several services at once","An account appearing for sale with recognizable inventory"],
       src:"The most concrete quantified figure available remains F5's 9.83 billion credential-stuffing attacks over July 2018&ndash;June 2020; no equivalent 2025&ndash;2026 gaming-specific figure was found, which is itself worth noting."},

      {id:"TECH-06", name:"SIM swap and 2FA bypass", ev:"doc", ages:["13-15","16-18"],
       where:["mobile carriers","account recovery flows"],
       def:"Taking over a teenager's phone number to intercept the codes that protect every account tied to it.",
       how:["Carrier account manipulated using breached personal data","Recovery questions abused where the answers are publicly discoverable","Number becomes the master key to every account using SMS codes"],
       sig:["Phone suddenly loses service with no explanation","Carrier notifications about a SIM or port change","Cascading password-reset emails within minutes"],
       src:"Zimperium reports a rise of more than 1,000% in SIM-swap attacks globally since 2022. The FCC has finalized carrier authentication rules for SIM swaps and port-outs. No source isolates minors specifically."},

      {id:"TECH-07", name:"Malicious extensions and store apps", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["Chrome Web Store","Google Play","App Store"],
       def:"Software installed from an official channel that performs credential theft, session hijacking or ad injection, the store listing itself being the social proof.",
       how:["Extensions marketed as game boosters, utilities or VPNs","Permissions requested are far broader than the stated function","Campaigns run for months before removal"],
       sig:["Extensions the child cannot explain","Browser behavior changes, redirects, injected ads, altered search","Permissions disproportionate to a simple tool"],
       src:"DomainTools and LayerX documented 100+ fake Chrome extensions performing credential and cookie theft in campaigns active since Feb 2024."},

      {id:"TECH-08", name:"Cryptojacking", ev:"emg", ages:["13-15","16-18"],
       where:["hijacked websites","bundled software"],
       def:"Scripts that use a device's processor to mine cryptocurrency in the background. Low direct harm, useful as a compromise indicator.",
       how:["Injected into hijacked sites via JavaScript and WebSocket connections","Also bundled with pirated software and cheat tools","Runs silently; the only symptom is performance"],
       sig:["Sustained high CPU use with nothing obviously running","Heat and fan noise during light browsing","Battery draining much faster than usual"],
       src:"The Hacker News (July 2025) reported 3,500 websites hijacked in a stealth mining campaign. No source specifically ties browser cryptojacking to child-targeted sites, treat that link as plausible but unverified."}
    ]
  },
  {
    code:"DATA", name:"Data exposure &amp; surveillance",
    desc:"The class where a child is harmed without doing anything at all. Their data is exposed by a school, a vendor, a toy, or an adult who installed something on their phone.",
    items:[
      {id:"DATA-01", name:"School and edtech breaches", ev:"doc", ages:["6-9","10-12","13-15","16-18"],
       where:["student information systems","LMS platforms","district networks"],
       def:"Breaches of the systems schools require children to use, exposing data no child chose to share, including health records and home addresses.",
       how:["Contractor or former-employee credentials without multi-factor authentication","Vendors holding data for many districts create single points of catastrophic failure","Extortion continues after payment: districts received fresh demands months later"],
       sig:["Institutional, not observable at home. The practical response is asking a district what it holds, how long, and who else can reach it"],
       src:"PowerSchool: 62 million students and 9.5 million teachers, exfiltrated 19&ndash;28 Dec 2024 through a contractor account on a portal lacking MFA; ~$2.85M ransom paid; fresh district-level demands followed in May 2025; the perpetrator, 19, was sentenced to 4 years and $14.1M restitution. Instructure/Canvas: disclosed 30 Apr 2026, ShinyHunters claimed ~9,000 schools. Illuminate Education: 10M+ students, stored in plain text until at least Jan 2022; FTC settlement Dec 2025. Comparitech counted 251 claimed education ransomware attacks globally in 2025."},

      {id:"DATA-02", name:"Childcare and kids' service breaches", ev:"doc", ages:["6-9"],
       where:["nurseries","after-school programs","kids' apps"],
       def:"Attacks on organizations holding data about very young children, where the extortion leverage is the children themselves.",
       how:["Double extortion with staged data releases on a countdown","Sample child profiles published publicly as proof and pressure","Data held includes photographs, dates of birth, home addresses and parental contacts"],
       sig:["Institutional. Worth asking any children's service what it stores and how it would notify"],
       src:"Kido International (UK nursery chain, Sept 2025): the group 'Radiant' stole data on ~8,000 children, posted sample profiles of 10 children to a leak site, and threatened further releases to press. Two 17-year-olds were arrested on 7 Oct 2025."},

      {id:"DATA-03", name:"Insecure kids' watches and GPS trackers", ev:"doc", ages:["6-9","10-12"],
       where:["kids' smartwatches","GPS trackers","white-label devices"],
       def:"Devices bought specifically to keep a child safe, several of which expose that child's location, audio and messages to anyone who looks.",
       how:["Sequentially guessable device IDs and default passwords on shared white-label platforms","Unencrypted transmission of location and photos","Some devices collect messages and voice notes, not just position"],
       sig:["A device with no MFA option and no encrypted messaging","A vendor with no published security contact","Unexpected reboots or unfamiliar paired connections"],
       src:"Consumer Reports tested 15 devices (Mar 2026) and found several kid-specific products lacking MFA and encrypted messaging; 80% of parents who track children's locations use such devices. Earlier research on the Thinkrace white-label platform, used by roughly 360 brands, found sequentially guessable IDs exposing tens of millions of devices."},

      {id:"DATA-04", name:"Baby monitors and home cameras", ev:"doc", ages:["6-9"],
       where:["nursery cameras","home security cameras"],
       def:"Cameras pointed at a child's bedroom, running on platforms with hardcoded credentials and missing access controls.",
       how:["Shared backend platforms underlie hundreds of differently branded products","Hardcoded credentials permit unauthorized live viewing","Stored motion-alert images accessible without authentication"],
       sig:["A camera brand with no firmware update history","Default credentials never changed","Cameras reachable from outside the home network"],
       src:"TechRepublic (May 2026): the Meari platform behind 300+ white-label camera brands exposed over 1 million devices, CVE-2026-33356, -33359 and -33362, permitting unauthorized live viewing and decryption of stored nursery images."},

      {id:"DATA-05", name:"Connected toys", ev:"doc", ages:["6-9","10-12"],
       where:["smart toys","kids' tablets","robot companions"],
       def:"Toys with microphones, cameras, Bluetooth and cloud backends, audited and found insecure across most of the sample.",
       how:["Server-side vulnerabilities or missing authentication risking remote camera and microphone activation","Bluetooth weaknesses exploitable through walls","Insecure local storage of collected data"],
       sig:["A toy with a microphone and no published privacy policy","Bluetooth pairing with no authentication","GPS collection in a toy with no location feature"],
       src:"Mozilla's Privacy Not Included toy report (Dec 2025, audits by 7ASecurity) tested 10 connected toys: 4 of 10 had insecure physical data storage, 6 of 10 had server-side vulnerabilities or missing authentication, 3 had exploitable Bluetooth weaknesses reachable through walls, and half collected GPS location. One robot was vulnerable to speaker hijacking, injected audio into a child's toy."},

      {id:"DATA-06", name:"Stalkerware sold as parental monitoring", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["monitoring apps","covert phone software"],
       def:"Covert monitoring software marketed to parents and routinely used by abusive partners and controlling adults, and frequently insecure itself.",
       how:["Marketed on being undetectable by the person monitored","Capable of remote camera and microphone activation","The monitoring company becomes a new holder of the child's most sensitive data"],
       sig:["A device warmer or slower than expected with no visible cause","Someone knowing things they had no legitimate way to learn","Unfamiliar device-administrator apps or profiles"],
       src:"Malwarebytes (July 2025): the Catwatchful 'child monitoring' app, marketed as invisible and undetectable, exposed 26,000 victims' photos, messages, location, call logs and audio, plus 62,000+ customer emails and passwords stored in plain text."},

      {id:"DATA-07", name:"Normalized peer location sharing", ev:"emg", ages:["13-15","16-18"],
       where:["Snap Map","location-sharing apps","game profiles"],
       def:"Continuous location sharing with a wide peer circle, now a social default rather than a decision, and a ready tool for a controlling partner or friend.",
       how:["Sharing defaults are set once and rarely revisited as friend lists grow","Turning it off reads socially as hiding something","Location history reveals routine, not just position"],
       sig:["A location shared with a list far wider than actual friends","Anxiety about being seen to disable sharing","A partner or friend who tracks movements and comments on them"],
       src:"Documented qualitatively across 2025 journalism and student reporting rather than by incident statistics, a real and widely observed norm, not a quantified harm."},

      {id:"DATA-08", name:"Ad-tech profiling of minors", ev:"doc", ages:["6-9","10-12","13-15","16-18"],
       where:["apps","games","video platforms"],
       def:"Behavioral data collected from children's accounts and passed to advertising infrastructure, in many cases without valid consent.",
       how:["Age signals withheld from developers, enabling deniability about who is being tracked","Child-directed content not labeled as such, so tracking proceeds by default","Third-party ad SDKs receive identifiers and behavioral data"],
       sig:["Institutional. Practically: reviewing what an app requests versus what it needs to function"],
       src:"FTC's amended COPPA Rule took effect 23 June 2025 with a 22 April 2026 compliance deadline, adding biometric identifiers and government IDs to 'personal information' and requiring retention limits and written security programs. Disney settled for $10M (Sept 2025) over unlabeled child-directed YouTube content; NGL Labs settled for $4.5M plus $500,000 to California."},

      {id:"DATA-09", name:"Doxxing via metadata and profile leakage", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["photos","game profiles","streams","social bios"],
       def:"Assembling a child's real identity and location from what they posted openly, embedded photo GPS, background details, usernames reused across services.",
       how:["EXIF location data embedded in photos posted without stripping","Recognizable backgrounds in streams and posted images","The same username reused across platforms links accounts into one profile"],
       sig:["The same handle used everywhere, including places with real-name information","Photos posted from home or school with identifiable surroundings","A stranger referencing a detail the child never stated"],
       src:"A standing, well-understood vector documented across security guidance. No 2025&ndash;2026 statistic quantifying child-victim doxxing via photo metadata specifically was found."}
    ]
  },
  {
    code:"PEER", name:"Peer aggression",
    desc:"Harm from other children. Higher prevalence than every other class combined, and the one adults most consistently mis-model, the measured data cuts against several common assumptions.",
    items:[
      {id:"PEER-01", name:"Direct cyberbullying", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["group chats","comments","DMs","game voice chat"],
       def:"Mean or hurtful comments, humiliation and rumor-spreading conducted online. The baseline form, and the most reported.",
       how:["Public comment threads and private group chats both used","Rumors spread faster and persist longer than offline equivalents","Screenshots make any exchange permanently redistributable"],
       sig:["Distress tied specifically to checking a phone","Withdrawal from a friend group or platform","Deleting or abandoning an account"],
       src:"Cyberbullying Research Center (3,466 US students 13&ndash;17, May 2025): ~58% lifetime victimization, ~33% within the past 30 days. Mean or hurtful comments 31.6%; rumor-spreading 29.2%; online humiliation 31.3%. Notably, boys reported higher rates than girls as both victims (36.6% vs 28.6%) and offenders (21.7% vs 10.4%), the reverse of the common assumption."},

      {id:"PEER-02", name:"Exclusion from group chats", ev:"doc", ages:["10-12","13-15"],
       where:["group texts","Discord servers","private stories"],
       def:"The most common measured form of cyberbullying, and the least visible: nothing is said to the child at all.",
       how:["Deliberate removal from or non-inclusion in a group everyone else is in","Parallel groups formed specifically to exclude one person","Visible evidence that an event happened without them"],
       sig:["Notification volume dropping sharply","Knowing about events they were not invited to","Distress with no identifiable incident to point to"],
       src:"Cyberbullying Research Center 2025: exclusion from texts or group chats was the single most common form at 32.5% within the past 30 days, higher than mean comments or rumor-spreading."},

      {id:"PEER-03", name:"Impersonation accounts", ev:"doc", ages:["13-15","16-18"],
       where:["Instagram","TikTok","Snapchat","anonymous apps"],
       def:"An account created in a child's name and used to post content designed to damage them, which they cannot delete.",
       how:["Profile photos and details copied from real accounts","Content posted designed to embarrass or provoke","Platform takedown requires proving identity, which takes time"],
       sig:["Friends referencing posts the child did not make","Accusations about behavior the child does not recognize","A near-identical handle with a small character difference"],
       src:"Documented across cyberbullying research as a recognized form; no separate prevalence figure isolating impersonation was found in the 2025 data."},

      {id:"PEER-04", name:"Doxxing", ev:"doc", ages:["13-15","16-18"],
       where:["Discord","forums","social media","streams"],
       def:"Publishing a child's real name, school, address or family details to invite harassment from strangers.",
       how:["Information assembled from the target's own scattered public posts","Published to a community primed to act on it","Used as a coercion tool inside extortion networks as well as in peer conflict"],
       sig:["A sudden influx of contact from strangers","Panic about information being 'out there'","Requests to leave a platform urgently"],
       src:"Documented by NAAG's 2025&ndash;2026 analysis of doxxing and swatting trends and repeatedly in FBI advisories on violent online networks."},

      {id:"PEER-05", name:"Swatting", ev:"doc", ages:["13-15","16-18"],
       where:["live streams","gaming communities"],
       def:"A false emergency report that sends armed police to a child's home, sometimes timed to a live broadcast.",
       how:["Requires the target's real address, obtained through doxxing","Timed for maximum audience when the target is streaming","Used as retaliation in gaming disputes and as coercion by extortion networks"],
       sig:["Home address discoverable from a stream or profile","Escalating conflict with an online community","Threats referencing the target's location"],
       src:"Documented case-by-case, including well-reported incidents involving teenage streamers, and named in FBI advisories on The Com. No authoritative aggregate count of swatting incidents against minors was found; treat prevalence claims here as unverified."},

      {id:"PEER-06", name:"Hate raids on streams", ev:"emg", ages:["13-15","16-18"],
       where:["Twitch","live-streaming platforms"],
       def:"Coordinated floods of abusive messages into a young streamer's chat, often automated and often targeting identity.",
       how:["Automated accounts flood chat faster than moderation can respond","Coordinated externally, executed in seconds","Frequently targets a streamer's race, gender or sexuality"],
       sig:["Abandoning streaming after an incident","Chat moderation settings suddenly locked down","Distress tied to a specific broadcast"],
       src:"Widely discussed in platform and advocacy sources; no primary quantitative 2025&ndash;2026 study was located. Flagged as an evidence gap rather than backed by a number."}
    ]
  },
  {
    code:"CONT", name:"Content &amp; influence",
    desc:"Harm delivered by recommendation rather than by a person. This class contains the register's most-inflated popular claims, so the contested entries here matter as much as the documented ones.",
    items:[
      {id:"CONT-01", name:"Algorithmic amplification to vulnerable accounts", ev:"doc", ages:["10-12","13-15","16-18"],
       where:["TikTok","Instagram","YouTube","short-video feeds"],
       def:"Recommendation systems that serve markedly more harmful content to accounts already signaling vulnerability. The differential is the finding, not that all teens see this.",
       how:["Signals of vulnerability in a profile change what gets recommended","Content arrives without being searched for","Community hashtags evolve to evade moderation"],
       sig:["A feed noticeably darker than the child's stated interests","Content arriving unsought on a specific theme","Time-of-day patterns clustering around low mood"],
       src:"CCDH's Deadly by Design (2022) created accounts as 13-year-olds: standard accounts were served suicide-related content within 2.6 minutes and eating-disorder content within 8 minutes, while accounts signaling vulnerability received 12 times more self-harm recommendations. Reuters reported internal Meta research showing Instagram serves more eating-disorder-adjacent content to teens already flagged as vulnerable."},

      {id:"CONT-02", name:"Eating disorder and self-harm communities", ev:"doc", ages:["13-15","16-18"],
       where:["TikTok","Instagram","forums","private groups"],
       def:"Peer communities that reinforce disordered behavior, reachable through hashtags deliberately mutated to survive moderation.",
       how:["Hashtag variants evolve continuously to evade filters","Community membership provides social reinforcement for the behavior","Content is recommended into feeds, not only sought out"],
       sig:["New vocabulary or numeric shorthand around eating or weight","Secrecy about accounts on one specific platform","Withdrawal from meals or activities alongside heavier phone use"],
       src:"CCDH (2022) documented eating-disorder hashtag communities spanning 56 hashtags with a combined 13.2 billion views. Senators Markey and Blumenthal formally pressed Meta on eating-disorder content targeting teens on Instagram."},

      {id:"CONT-03", name:"Nihilistic violent extremism recruitment", ev:"doc", ages:["10-12","13-15"],
       where:["Discord","Roblox","Minecraft","Telegram"],
       def:"Recruitment into violent online networks through games and chat apps, targeting isolated and struggling children specifically.",
       how:["Contact begins as friendship or romance in a game the child already plays","Subgroup leaders require proof of illegal activity as an admission condition, pressuring recruits toward offending","Ideological material is layered onto an existing coercive relationship"],
       sig:["New online friendships the child is secretive about","Escalating dares framed as loyalty tests","Interest in symbols or numeric aliases with no explanation"],
       src:"FBI advisories describe recruitment targeting ages 11&ndash;25 through minor-friendly applications and note recruiters exploit the belief that minors face no criminal liability. ISD documents the proof-of-offending admission requirement and the network's splintering into many rebranded offshoots. House Oversight opened an inquiry in 2026."},

      {id:"CONT-04", name:"Misogynist and incel radicalization", ev:"emg", ages:["13-15","16-18"],
       where:["YouTube","TikTok","forums","Discord"],
       def:"A documented ideological pipeline from grievance to hostility toward women, reaching teenage boys through mainstream recommendation rather than fringe sites.",
       how:["Entry through mainstream self-improvement, fitness or dating content","Progressive escalation as engagement signals interest","Community reinforcement of a fixed explanatory framework"],
       sig:["New vocabulary describing social status in fixed hierarchies","Hostility toward women framed as realism","A recommendation feed dominated by one commentator"],
       src:"Documented in 2025 peer-reviewed network and discourse analyses of incel forums. A widely repeated media claim that this content 'doubled online' after the drama Adolescence could not be traced to a primary source and should not be relied on. Age-of-first-exposure and prevalence figures do not exist, a real gap."},

      {id:"CONT-05", name:"Health misinformation and self-diagnosis", ev:"doc", ages:["13-15","16-18"],
       where:["TikTok","YouTube","short-video feeds"],
       def:"Medical and mental-health claims delivered by creators with no clinical basis, driving teenagers toward self-diagnosis using inaccurate criteria.",
       how:["Diagnostic checklists compressed into short video formats","Engagement rewards relatable symptom lists over accurate ones","Identity forms around a self-applied label before any assessment"],
       sig:["Confident self-diagnosis sourced entirely from short videos","Resistance to professional assessment because 'it's already obvious'","A feed dominated by symptom-checklist content"],
       src:"An AAP-covered study found a majority of eco-influencer TikTok videos contained contradictory or inaccurate medical information. Harvard's Petrie-Flom Center (April 2025) documents TikTok-driven mental-health self-diagnosis trends spreading inaccurate criteria to teens."},

      {id:"CONT-06", name:"Finfluencers and financial misinformation", ev:"emg", ages:["16-18"],
       where:["TikTok","YouTube","Instagram","Discord"],
       def:"Financial advice delivered to teenagers by creators with inconsistent disclosure of risk or compensation, feeding directly into the crypto and pump-scheme funnel.",
       how:["Returns presented without risk, losses omitted","Compensation and position disclosure inconsistent or absent","Audiences funneled into paid groups and private channels"],
       sig:["Investment decisions sourced from a single creator","Talk of a private paid group","Trading with money that cannot be lost"],
       src:"A 2025&ndash;2026 longitudinal study of UK TikTok finfluencers documented inconsistent disclaimer practice. That is a content analysis, not a harm-outcome study, no verified figure exists for teen losses attributable to finfluencers."},

      {id:"CONT-07", name:"Viral \"challenge\" panics", ev:"con", ages:["6-9","10-12","13-15"],
       where:["news coverage","school communications","parent groups"],
       def:"Included deliberately as a negative entry. Some widely circulated challenges are hoaxes; others are real behaviors mislabeled as algorithmic creations. Chasing them wastes attention that belongs elsewhere.",
       how:["Media and school warnings amplify a challenge far beyond its actual reach","Amplification itself introduces the behavior to children who had not encountered it","Genuine pre-existing behaviors get re-attributed to whichever platform is current"],
       sig:["The signal to watch is adult behavior: a warning circulating with no verifiable case behind it"],
       src:"The Momo Challenge is a confirmed hoax, India's CBI found no linked death and the NSPCC, Samaritans and UK Safer Internet Centre declared it a moral panic. On the blackout challenge: the deaths are real and litigated, but the CDC documented 82 probable choking-game deaths among 6&ndash;19-year-olds between 1995 and 2007, long before TikTok existed. The Third Circuit's Aug 2024 ruling addressed Section 230 immunity, not causation."}
    ]
  }
];

const EV_LABEL = {doc:"Documented", emg:"Emerging", con:"Contested"};

function render(){
  const root = document.getElementById("register");
  root.innerHTML = CLASSES.map(function(c){
    const cards = c.items.map(function(it){
      const ages = it.ages.map(function(a){return '<span class="pill age">'+a+'</span>';}).join("");
      const where = it.where.map(function(w){return '<span class="pill">'+w+'</span>';}).join("");
      return '<article class="card" data-ages="'+it.ages.join(",")+'" data-ev="'+it.ev+'">'
        + '<div class="card-top"><div><div class="card-id">'+it.id+'</div><h4>'+it.name+'</h4></div>'
        + '<span class="tag '+it.ev+'">'+EV_LABEL[it.ev]+'</span></div>'
        + '<p class="def">'+it.def+'</p>'
        + '<div><p class="sub">How it runs</p><ul>'+it.how.map(function(h){return '<li>'+h+'</li>';}).join("")+'</ul></div>'
        + '<div><p class="sub">Detectable signals</p><ul class="signals">'+it.sig.map(function(s){return '<li>'+s+'</li>';}).join("")+'</ul></div>'
        + '<div><p class="sub">Evidence</p><p class="src">'+it.src+'</p></div>'
        + '<div class="meta-row">'+ages+where+'</div>'
        + '</article>';
    }).join("");
    return '<div class="class-block" id="'+c.code+'">'
      + '<div class="class-head"><span class="class-code">'+c.code+'</span><h3>'+c.name+'</h3></div>'
      + '<p class="class-desc">'+c.desc+'</p>'
      + '<div class="cards">'+cards+'</div></div>';
  }).join("");
}

let activeAge = "all", activeEv = "all";

function applyFilters(){
  let shown = 0, total = 0;
  document.querySelectorAll(".class-block").forEach(function(block){
    let visibleInBlock = 0;
    block.querySelectorAll(".card").forEach(function(card){
      total++;
      const ages = card.getAttribute("data-ages").split(",");
      const ev = card.getAttribute("data-ev");
      const okAge = activeAge === "all" || ages.indexOf(activeAge) !== -1;
      const okEv = activeEv === "all" || ev === activeEv;
      const ok = okAge && okEv;
      card.classList.toggle("dim", !ok);
      if(ok){visibleInBlock++; shown++;}
    });
    block.classList.toggle("dim", visibleInBlock === 0);
  });
  document.getElementById("count").textContent = shown + " of " + total + " entries";
}

function wireButtons(attr, setter){
  const btns = document.querySelectorAll("[data-"+attr+"]");
  btns.forEach(function(b){
    b.addEventListener("click", function(){
      btns.forEach(function(o){o.setAttribute("aria-pressed","false");});
      b.setAttribute("aria-pressed","true");
      setter(b.getAttribute("data-"+attr));
      applyFilters();
    });
  });
}

render();
wireButtons("age", function(v){activeAge = v;});
wireButtons("ev", function(v){activeEv = v;});
applyFilters();
