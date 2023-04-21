import sdk from "matrix-js-sdk";
import fetch from "node-fetch"
import moment from "moment";
import clc from "cli-color";
globalThis.fetch = fetch

var client = sdk.createClient({
    baseUrl: "https://matrix-client.matrix.org",
    accessToken: "syt_Z2hvc2Fsc2F0dGFt_drxMMMjnrYrfGhzUUfcf_1YM5bG",
    userId: "@ghosalsattam:matrix.org"
});

export async function getAllRooms(){
	client.startClient();
	const rooms=await client.getJoinedRooms();
	console.log(rooms);
	return rooms;
}

export async function getRoomInfo(roomId){
	client.startClient();
	const rooms=await client.getRoomHierarchy(roomId);
	console.log(rooms);
	return rooms;
}

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

export async function getLiveMessages(roomId){
	client.startClient();
	client.on("Room.timeline", function(event, room, toStartOfTimeline) {
		// console.log(event.event);
		let obj={}
		if (event.getType() !== "m.room.message"||event.event.room_id!==roomId) {
			 return;// only use messages
		}else{
			obj.sender=event.event.sender;
			obj.message=event.event.content.body
			var utc=(event.event.origin_server_ts);
			obj.timestamp=moment.unix(utc/1000).utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ssZ")
			console.log('\x1b[36m%s\x1b[0m', (obj));
			// console.log(chalk.blue(event.event.content.body));
		}
	});
}