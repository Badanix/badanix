// import  { useState } from "react";
// import { MdOutlineAttachFile } from "react-icons/md";
// import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
// import { HiMiniSpeakerWave } from "react-icons/hi2";
// import { PiPhoneDisconnectFill } from "react-icons/pi";
// import PropTypes from "prop-types";

// const VideoCall = ({ img, name,  }) => {
//   const [isVideoOn, setIsVideoOn] = useState(false);
//   const [isVideoSubed, setIsVideoSubed] = useState(false);
//   const [isAudioOn, setIsAudioOn] = useState(false);
//   const [isSpeakerOn, setIsSpeakerOn] = useState(false);
//   const [ringing, setRinging] = useState(true);
//   const channel = useRef("");
//   const appid = useRef("6ab147544dd64f19ba3414be8453c01e");
//   const token = useRef("");  const handleJoinCall = () => {
//     setIsVideoOn(true);
//     setTimeout(() => setIsVideoSubed(true), 3000); 
//   };

//   const handleSpeakerToggle = () => {
//     setIsSpeakerOn(!isSpeakerOn);
//   };

//   return (
//     <div>
//       {/* Conditional UI when the user initiates video */}
//       {isVideoOn && !isVideoSubed && (
//         <div>
//           <div className="w-full p-4 flex flex-col items-center">
//             <img
//               src={img}
//               alt={name}
//               className="rounded-full w-24 h-24"
//             />
//             <h3 className="mt-2 text-xl font-bold text-gray-300">{name}</h3>
//             <p className="text-gray-400">{ringing ? "Ringing..." : "Calling..."}</p>
//           </div>

//           <div className="items-center flex justify-center mx-auto mt-9">
//             <video
//               id="camera-video"
//               className="w-[420px] mx-auto rounded-xl"
//               hidden={!isVideoOn}
//             ></video>
//           </div>
//         </div>
//       )}

//       {/* Conditional UI when another participant has joined */}
//       {isVideoSubed && (
//         <div>
//           <div className="w-full p-4 flex flex-col items-center">
//             <img
//               src={img}
//               alt={name}
//               className="rounded-full w-24 h-24"
//             />
//             <h3 className="mt-2 text-xl font-bold text-gray-300">{name}</h3>
//             <p className="text-gray-400">{ringing ? "Ringing..." : "In Call"}</p>
//           </div>

//           <div className="items-center flex justify-center mx-auto mt-9">
//             <video
//               id="camera-video"
//               className="w-[420px] mx-auto rounded-xl"
//             ></video>
//           </div>

//           <div className="items-center flex justify-center mx-auto mt-9 bg-black bg-opacity-50 rounded-2xl p-5 space-x-7 w-4/12">
//             {/* Attach File Icon */}
//             <MdOutlineAttachFile
//               size={35}
//               className={`rounded-full p-2 cursor-pointer bg-gray-700 text-white`}
//             />

//             {/* Microphone Icon */}
//             <div
//               className={`rounded-full p-2 cursor-pointer ${
//                 isAudioOn ? "bg-white text-black" : "bg-gray-700 text-white"
//               }`}
//               onClick={() => setIsAudioOn(!isAudioOn)}
//             >
//               {isAudioOn ? <FaMicrophone size={19} /> : <FaMicrophoneSlash size={19} />}
//             </div>

//             {/* Speaker Icon */}
//             <HiMiniSpeakerWave
//               size={35}
//               onClick={handleSpeakerToggle}
//               className={`rounded-full p-2 ${
//                 isSpeakerOn ? "bg-white text-black" : "bg-gray-700 text-white"
//               }`}
//             />

//             {/* Disconnect Icon */}
//             <PiPhoneDisconnectFill
//               size={35}
//               onClick={() => setIsVideoOn(false)}
//               className="cursor-pointer rounded-full p-2 text-white bg-red-500"
//             />
//           </div>
//         </div>
//       )}

//       {/* Button to initiate the call */}
//       {!isVideoOn && (
//         <button
//           className="bg-blue-500 text-white p-3 rounded-md mt-5"
//           onClick={handleJoinCall}
//         >
//           Join Call
//         </button>


// <video id="camera-video" hidden={isVideoOn ? false : true}></video>
// </div>
// <video id="remote-video" hidden={isVideoSubed ? false : true}></video> 
//       )}
//     </div>
//   );
// };
// VideoCall.propTypes={
//     img: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     appid: PropTypes.string.isRequired,
//      channelName: PropTypes.string.isRequired,
  
// };

// export default VideoCall;
