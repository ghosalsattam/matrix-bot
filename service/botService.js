'use strict';
import { getAllRooms, getRoomInfo, getHistoricalMessages, postMessage } from "../interface/matrix.client.js";
import { respondWithCode } from "../utils/writer.js";

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
    if(!roomArray.length){
      throw respondWithCode(404, {message: "Rooms are not available for the given account"})
    }
    return roomArray;
  }catch(error){
    console.log('\u001b[31m',error);
    if(error.httpStatus===401){
      throw respondWithCode(401, {message: "Invalid Authentication"})
    }
    throw respondWithCode(500, {message: "Internal Server Error. Please check the base url."})
  }
}


/**
 * Fetch Available channels for the given matrix server.
 * Fetch Available channels for the given matrix server. 
 *
 * roomId String 
 * returns List of messages.
 **/
export async function getMessagesService(roomId, res) {
  try{
    var room=await getHistoricalMessages(roomId, res);
    if(!room.length){
      return respondWithCode(404,{message: `No messages on the room ${roomId} yet`})
    }
    return respondWithCode(200, {messages: room});
  }catch(error){
    console.log('\u001b[31m', error);
    if(error.httpStatus===403){
      throw respondWithCode(422, {message: error.data.error})
    }
    if(error.httpStatus===401){
      throw respondWithCode(401, {message: "Invalid Authentication"})
    }
    throw respondWithCode(500, {message: "Internal Server Error. Check the server/room configurations."})
  }
}

/**
 * Sends message to a channel
 * @param {string} roomId: room id 
 * @param {object} body: object containing the message to be sent. 
 * @returns 
 */
export async function postMessagesService(roomId, body) {
  try{
    let res=await postMessage(roomId, body);
    return res;
  }catch(error){
    console.log('\u001b[31m', error);
    if(error.httpStatus===403){
      throw respondWithCode(422, {message: error.data.error})
    }
    if(error.httpStatus===401){
      throw respondWithCode(401, {message: "Invalid Authentication"})
    }
    throw respondWithCode(500, {message: "Internal Server Error. Check the server/room configurations."})
  }
}

