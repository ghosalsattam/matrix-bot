import sdk from "matrix-js-sdk";
import fetch from "node-fetch"
import moment from "moment";
import { BotConf } from "../conf/botConf.js"
globalThis.fetch = fetch

var client = sdk.createClient({
    baseUrl: BotConf.baseUrl,
    accessToken: BotConf.accessToken,
    userId: BotConf.userId
});

/**
 * Finds all the rooms associated with fiven account.
 * @returns list of rooms
 */
export async function getAllRooms(){
	client.startClient();
	const rooms=await client.getJoinedRooms();
	return rooms;
}

/**
 * Returns metadata about the room.
 * @param {string} roomId: Room ID 
 * @returns array if rooms with their metadata.
 */
export async function getRoomInfo(roomId){
	client.startClient();
	const rooms=await client.getRoomHierarchy(roomId);
	return rooms;
}

/**
 * Get all historical messages about the room.
 * @param {String} roomId: Room Id 
 * @returns messages list
 */
export async function getHistoricalMessages(roomId){
	client.startClient();
	const rooms=await client.roomInitialSync(roomId)
	let messagesList=[]
	for await (const room of rooms.messages.chunk){
		let rObj={}
		if(room.type=="m.room.message"){
			rObj.message=room.content.body;
			rObj.sender=room.sender;
			var theDate=new Date(room.origin_server_ts)
			var utc=(room.origin_server_ts);
			rObj.timestamp=moment.unix(utc/1000).utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ssZ")
			messagesList.push(rObj);
		}
	}
	return messagesList;
}

/**
 * logs live messages in the room
 * @param {String} roomId: Room Id 
 */
export async function getLiveMessages(roomId){
	client.startClient();
	try{
		client.on("Room.timeline", function(event, room, toStartOfTimeline) {
			let obj={}
			if (event.getType() !== "m.room.message"||event.event.room_id!==roomId) {
				 return;// only use messages
			}else{
				obj.sender=event.event.sender;
				obj.message=event.event.content.body
				var utc=(event.event.origin_server_ts);
				obj.timestamp=moment.unix(utc/1000).utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ssZ")
				console.log('\x1b[36m%s\x1b[0m', (obj));
			}
		});
	}catch(error){
		console.log('\u001b[31m', error);
	}	
}

/**
 * Posts amessage to a channel.
 * @param {string} roomId 
 * @param {object} body 
 * @returns an object saying the message is posted successfully.
 */
export async function postMessage(roomId, body){
	try
	{
		client.startClient();
		var content = {
			"body": body.message,
			"msgtype": "m.text"
		};

		let res=await client.sendEvent(roomId, "m.room.message", content, "")
		return {message: "Successfully sent the message.", timestamp: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ssZ")}
	}catch(error){
		console.log('\u001b[31m', error);
	}
}