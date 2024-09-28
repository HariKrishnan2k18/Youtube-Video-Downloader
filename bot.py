# ©️ LISA-KOREA | @LISA_FAN_LK | NT_BOT_CHANNEL | LISA-KOREA/YouTube-Video-Download-Bot

# [⚠️ Do not change this repo link ⚠️] :- https://github.com/LISA-KOREA/YouTube-Video-Download-Bot



from pyrogram import Client, filters
# from Youtube.config import Config

# Create a Pyrogram client
app = Client(
    "my_bot",
    api_id='19340501', 
    api_hash='7dd7b1984a85c0258c87c17cfac1542b', 
    bot_token='7624800788:AAHQmwhSKhPI5Tz49bvMY_Hr6t5boUIg2j0',
    plugins=dict(root="Youtube")
)



# Start the bot
print("🎊 I AM ALIVE 🎊")
app.run()
