
const { Telegraf } = require('telegraf')
const axios = require("axios");
require('dotenv').config();

const bot=new Telegraf(process.env.TEL_KEY);






var options = {
  url:'https://indian-news-live.p.rapidapi.com/news/cricket',
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'indian-news-live.p.rapidapi.com',
    'x-rapidapi-key': process.env.API_KEY,
  }
};

var fetchUpdates =  async(options) => {
    try {
       var data = await axios (options)
       .catch((e) => console.log(e));
     
        return (data);
      
    } catch (e) {
      throw e;
    }
  }
  bot.telegram.setMyCommands([
    { command: '/start', description: 'start a dialogue with CricNews' },
    { command: '/help', description: 'know different and functionalities available' },
    { command: '/about', description: 'to know more about bot maker' },
    { command: '/cricket', description: 'get cricket news update' }
  ])

bot.command("cricket", async (ctx) => {
    
    try {
      ctx.reply(`${Date()}`);
      ctx.reply("⌛️ Please Wait It will take few seconds to grab Updates"); // bot will send a reply to users. 
     
      const values = await fetchUpdates(options);
      console.log(`done `);
    
    
    for (let r of values.data){
       
        ctx.reply(`
        Details:
 ${r.title}

Find the complete article at :

      ${r.url}
        ${r.img}
        `);

        
        
    }
     
      
    } catch (e) {
      console.log(e);
      ctx.reply("Please try after sometime Server is down :(")
    }
  });


bot.start(ctx => ctx.reply(`
Hi, I'm a simple bot to give Daily Cricket News. 
(please write /help to know how to use)
Visit site https://cric-newsupdate.netlify.app/ 
`))

bot.command('about', (ctx) => {
    ctx.reply(`Hey, my name @aashirwadd and i created using Node js to get Cricket News. You can also visit the site https://cric-newsupdate.netlify.app/ `)
})

bot.help(ctx => ctx.reply(`
   Write /cricket to get cricket updates. 
  Write /about to know about me.
  Send a sticker to get emoji in return.
`))

bot.on('sticker', (ctx) => ctx.reply('👍'))





bot.launch();