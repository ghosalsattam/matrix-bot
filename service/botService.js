'use strict';
import { getAllRooms, getRoomInfo, getHistoricalMessages, getLiveMessages } from "../interface/matrix.client.js";

/**
 * Fetch Available channels for the given matrix server.
 * Fetch Available channels for the given matrix server. 
 *
 * returns List
 **/
export async function getAllRoomsService() {
  try{
    var roomArray=[]
    const data=await getAllRooms();
    
    for await (let roomId of data.joined_rooms){
      var roomInfo = await getRoomInfo(roomId);
      for await(let room of roomInfo.rooms){
        var roomMetadata = {};
        roomMetadata.room_id = room.room_id;
        roomMetadata.room_name = room.name;
        roomMetadata.no_of_members=room.num_joined_members;
        roomMetadata.join_rule=room.join_rule;
        roomMetadata.world_readable=room.world_readable;
        roomMetadata.encryption=room["im.nheko.summary.encryption"]||"No Encryption"
        roomArray.push(roomMetadata);
      };
    }
    return roomArray;
  }catch(error){
    console.log(error);
    throw({code: 500, message: "Internal Server Error"})
  }
}


/**
 * Fetch Available channels for the given matrix server.
 * Fetch Available channels for the given matrix server. 
 *
 * roomId String 
 * returns List
 **/
export async function getMessagesService(roomId, res) {
  var room=getHistoricalMessages(roomId, res);
  return room;
}

