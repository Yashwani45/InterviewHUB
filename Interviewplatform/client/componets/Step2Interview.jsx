// import React, { useState, useRef, useEffect } from "react";
// import femaleVideo from "../src/assets/videos/female-ai.mp4";
// import maleVideo from "../src/assets/videos/male-ai.mp4";
// import Timer from "./Timer";
// import { motion } from "motion/react";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaMicrophone,
//   FaMicrophoneSlash,
// } from "react-icons/fa";
// import axios from "axios";
// // import { finishInterview } from '../../server/controller/interviewController';
// import * as faceapi from "face-api.js";

// const Step2Interview = ({ interviewData, onFinish }) => {
//   const videoUserRef = useRef(null);
//   const { interviewId, questions, userId, userName } = interviewData;
//   const [isIntro, setIsIntro] = useState(true);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [isFeedbackPlaying, setIsFeedbackPlaying] = useState(false);
//   const [ismicOn, setIsMicOn] = useState(true);
//   const [isAiPlaying, setIsAiPlaying] = useState(false);
//   const recognitionRef = useRef(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [timeleft, setTimeLeft] = useState(
//     questions[currentQuestionIndex].timeLimit || 60,
//   );
//   const [selectVoice, setSelectVoice] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [voiceGender, setVoiceGender] = useState("female");
//   const [subtitle, setSubtitle] = useState("");
//   const [cheatCount, setCheatCount] = useState(0);
//   const videoRef = useRef(null);
//   const currentQuestion = questions[currentQuestionIndex];

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoUserRef.current) {
//           videoUserRef.current.srcObject = stream;
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//     };
//     loadModels();
//   }, []);

//   let interval;

//   useEffect(() => {
//     interval = setInterval(async () => {
//       if (!videoUserRef.current) return;

//       const detections = await faceapi.detectAllFaces(
//         videoUserRef.current,
//         new faceapi.TinyFaceDetectorOptions(),
//       );

//       if (detections.length === 0) {
//         console.log("⚠️ Face not detected");
//          setCheatCount((prev) => prev + 1);
//       } else {
//         const box = detections[0].box;

//         if (box.x < 50 || box.x > 300) {
//           console.log("⚠️ Looking away");
//           setCheatCount((prev) => prev + 1);
//         }
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();
//       if (!voices.length) return;

//       const femaleVoice =
//         voices.find((voice) => voice.name.toLowerCase().includes("female")) ||
//         voices.find((voice) => voice.name.toLowerCase().includes("zira")) ||
//         voices.find((voice) => voice.name.toLowerCase().includes("samantha"));
//       if (femaleVoice) {
//         setSelectVoice(femaleVoice);
//         setVoiceGender("female");
//         return;
//       }

//       const maleVoice =
//         voices.find((voice) => voice.name.toLowerCase().includes("male")) ||
//         voices.find((voice) => voice.name.toLowerCase().includes("david")) ||
//         voices.find((voice) => voice.name.toLowerCase().includes("mark"));
//       if (maleVoice) {
//         setSelectVoice(maleVoice);
//         setVoiceGender("male");
//         return;
//       }

//       setSelectVoice(voices[0]);
//       setVoiceGender("female");
//     };
//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

//   const speakText = (text) => {
//     return new Promise((resolve) => {
//       if (!selectVoice || !window.speechSynthesis) {
//         resolve();
//         return;
//       }

//       window.speechSynthesis.cancel();

//       const humanizeText = text.replace(/,/g, ",...").replace(/\./g, ". ...");

//       const utterance = new SpeechSynthesisUtterance(humanizeText);

//       utterance.voice = selectVoice;
//       utterance.rate = 0.92;
//       utterance.pitch = 1.05;
//       utterance.volume = 1;

      
//       const isFeedbackSpeech = !!feedback && text === feedback;

//       utterance.onstart = () => {
//         setIsAiPlaying(true);

//         if (isFeedbackSpeech) {
//           setIsFeedbackPlaying(true);
//         }

//         setIsTimerRunning(false);
//         StopMic();
//         videoRef.current?.play();
//       };

//       utterance.onend = () => {
//         videoRef.current?.pause();
//         videoRef.current.currentTime = 0;

//         setIsAiPlaying(false);
//         setIsFeedbackPlaying(false);

//         if (!isFeedbackSpeech) {
//           setTimeLeft(currentQuestion.timeLimit || 60);
//           setIsTimerRunning(true);
//         }

//         if (ismicOn && !isFeedbackSpeech) {
//           StartMic();
//         }

//         setTimeout(() => {
//           setSubtitle("");
//           resolve();
//         }, 300);
//       };

//       setSubtitle(text);
//       window.speechSynthesis.speak(utterance);
//     });
//   };

//   useEffect(() => {
//     if (!selectVoice) return;
//     const runInterview = async () => {
//       if (isIntro) {
//         await speakText(
//           `Hello ${userName}, welcome to your interview.  My name is Zira , I am your AI interviewer , I will be asking you a series of questions.`,
//         );

//         await new Promise((r) => setTimeout(r, 600));

//         await speakText(`Let's start with the first question.`);

//         setIsIntro(false);

//         await speakText(currentQuestion.question);
//         if (ismicOn) {
//           StartMic();
//         }
//       } else if (currentQuestion) {
//         await new Promise((r) => setTimeout(r, 800));
//         if (currentQuestionIndex === questions.length - 1) {
//           await speakText(
//             `Alright , This question is might be , a bit challenging for you ${userName}`,
//           );
//         }

//         await speakText(`${currentQuestion.question}`);
//         if (ismicOn) {
//           StartMic();
//         }
//       }
//     };

//     runInterview();
//   }, [selectVoice, isIntro, currentQuestionIndex]);

//   const increaseIndex = async () => {
//     setIsTimerRunning(false);
//     setAnswer("");
//     setFeedback("");

//     if (currentQuestionIndex + 1 >= questions.length) {
//       return;
//     }

//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   useEffect(() => {
//     if (isIntro) return;
//     if (!currentQuestion) return;
//     if (timeleft === 0 && !isSubmitting && !feedback) {
//       submitAnswer();
//     }
//   }, [timeleft]);

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//         recognitionRef.current.abort();
//       }
//       window.speechSynthesis.cancel();
//     };
//   }, []);

// const finishInterview = async () => {
//   StopMic();
//   setIsMicOn(false);

//   try {
//     const result = await axios.post(
//       `${import.meta.env.VITE_SERVER_URL}/api/interview/finish`,
//       {
//         interviewId,
//         cheatCount 
//       },
//       { withCredentials: true }
//     );

//     onFinish(result.data);

//   } catch (error) {
//     console.log(error);
//   }
// };
//   //   useEffect(() => {
//   //   if (isIntro || isAiPlaying) return;
//   //   if (!currentQuestion) return;
//   //   if(isSubmitting) return ;

//   //   // reset timer when new question starts
//   //   setTimeLeft(currentQuestion.timeLimit || 60);

//   //   const timer = setInterval(() => {
//   //     setTimeLeft((prev) => {
//   //       if (prev <= 1) {
//   //         clearInterval(timer);
//   //         return 0;
//   //       }
//   //       return prev - 1;
//   //     });
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, [isIntro, isAiPlaying, currentQuestionIndex , isSubmitting]);

//   useEffect(() => {
//     if (!isTimerRunning) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setIsTimerRunning(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isTimerRunning]);
//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) return;

//     const recognition = new window.webkitSpeechRecognition();

//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onresult = (event) => {
//       const transcript = event.results[event.results.length - 1][0].transcript;
//       setAnswer((prev) => prev + " " + transcript);
//     };

//     recognition.onend = () => {
//       if (ismicOn && !isAiPlaying) {
//         try {
//           recognition.start();
//         } catch {}
//       }
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const StartMic = () => {
//     if (recognitionRef.current && !isAiPlaying) {
//       try {
//         recognitionRef.current.start();
//       } catch (e) {
//       }
//     }
//   };

//   const StopMic = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   const toggleMic = () => {
//     if (ismicOn) {
//       StopMic();
//     } else {
//       StartMic();
//     }

//     setIsMicOn(!ismicOn);
//   };

//   const submitAnswer = async () => {
//     if (isSubmitting) return;

//     setIsTimerRunning(false);
//     StopMic();
//     setIsSubmitting(true);

//     try {
//       let result = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/interview/submit-answers`,
//         {
//           interviewId,
//           questionIndex: currentQuestionIndex,
//           answer,
//           timeTaken: currentQuestion.timeLimit - timeleft,
//         },
//         { withCredentials: true },
//       );

//       const feedbackText = result.data.feedback;
//       setFeedback(feedbackText);

//       setTimeout(async () => {
//         await speakText(feedbackText);

//         if (currentQuestionIndex + 1 >= questions.length) {
//           finishInterview(); 
//         } else {
//           increaseIndex();
//         }

//         setIsSubmitting(false);
//       }, 100);
//     } catch (error) {
//       console.log(error);
//       setIsSubmitting(false);
//     }
//   };
//   const hasAborted = useRef(false);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden && !hasAborted.current) {
//         hasAborted.current = true;
//         abortInterview();
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   const abortInterview = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/interview/abort`,
//         { interviewId },
//         { withCredentials: true },
//       );

//       alert("Interview aborted due to tab switching");

//       onFinish({ status: "aborted" });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6">
//       <div className="w-full max-w-6xl min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden">
      
//         <div className="w-full lg:w-[40%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200">
//           <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl relative ">
//             <video
//               src={videoSource}
//               key={videoSource}
//               ref={videoRef}
//               muted
//               playsInline
//               preload="auto"
//               className="w-full h-auto object-cover"
//             />
            
//           </div>

          

//           {subtitle && (
//             <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 ">
//               <p className="tex-gray-700 text-sm sm:text-base font-medium leading-relaxed text-center">
//                 {subtitle}
//               </p>
//             </div>
//           )}

//           <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Interview Status</span>
//               {isAiPlaying && (
//                 <span className="text-sm font-semibold text-emerald-600">
//                   {isAiPlaying ? "AI is Speaking..." : ""}
//                 </span>
//               )}
//             </div>

//             <div className="h-px bg-gray-200" />

//             <div className="flex justify-center">
//               {!isIntro && !isAiPlaying && !isFeedbackPlaying && (
//                 <Timer
//                   timeLeft={timeleft}
//                   totalTime={currentQuestion?.timeLimit || 60}
//                 />
//               )}
//             </div>
//             <div className="h-px bg-gray-200"></div>
//             <div className="grid grid-cols-2 gap-6 text-center">
//               <div>
//                 <span className="text-2xl font-bold text-emerald-500">
//                   {currentQuestionIndex + 1}
//                 </span>
//                 <span className="text-sm text-gray-500">Question</span>
//               </div>
//               <div>
//                 <span className="text-2xl font-bold text-emerald-500">
//                   {questions.length}
//                 </span>
//                 <span className="text-sm text-gray-500">Total Questions</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-6">
//             AI Interview
//           </h2>

//           <div className="flex flex-col flex-1 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
//             {!isIntro && (
//               <p className="text-xs sm:text-sm text-gray-400 mb-2">
//                 Question {currentQuestionIndex + 1} of {questions.length}
//               </p>
//             )}
//             {!isIntro && (
//               <div className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
//                 {currentQuestion?.question}
//               </div>
//             )}

            
//             <textarea
//               placeholder="Type your answer here..."
//               onChange={(e) => setAnswer(e.target.value)}
//               value={answer}
//               className="flex-1 w-full bg-gray-200 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800"
//             />

            
//             {!feedback ? (
//               <div className="flex items-center gap-4 mt-6">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-black text-white rounded-full shadow-lg"
//                   onClick={toggleMic}
//                 >
//                   {ismicOn ? (
//                     <FaMicrophone size={20} />
//                   ) : (
//                     <FaMicrophoneSlash size={20} />
//                   )}
//                 </motion.button>

//                 <motion.button
//                   onClick={submitAnswer}
//                   disabled={isSubmitting}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 md:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled : bg-gray-400"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Answer"}{" "}
//                 </motion.button>
//               </div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm"
//               >
//                 <p className="text-emerald-700 font-medium mb-4 ">
//                   {" "}
//                   {feedback}
//                 </p>
//                 <button
//                   onClick={increaseIndex}
//                   className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 shadow-md hover:opacity-90 transition flex item-center justify-center gap-1"
//                 >
//                   Next Question <FaArrowRight size={18} />
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//       <video
//               ref={videoUserRef}
//               autoPlay
//               muted
//               className="absolute top-3 left-3 w-40 h-32 rounded-xl border-2 border-white shadow-lg object-cover"
//             />
//     </div>
//   );
// };

// export default Step2Interview;
import React, { useState, useRef, useEffect } from "react";
import femaleVideo from "../src/assets/videos/female-ai.mp4";
import maleVideo from "../src/assets/videos/male-ai.mp4";
import Timer from "./Timer";
import { motion, AnimatePresence } from "motion/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";
import axios from "axios";
import * as faceapi from "face-api.js";

const Step2Interview = ({ interviewData, onFinish }) => {
  const videoUserRef = useRef(null);
  const { interviewId, questions, userId, userName } = interviewData;
  const [isIntro, setIsIntro] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFeedbackPlaying, setIsFeedbackPlaying] = useState(false);
  const [ismicOn, setIsMicOn] = useState(true);
  const [isAiPlaying, setIsAiPlaying] = useState(false);
  const recognitionRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeleft, setTimeLeft] = useState(
    questions[currentQuestionIndex].timeLimit || 60,
  );
  const [selectVoice, setSelectVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const [cheatCount, setCheatCount] = useState(0);
  const videoRef = useRef(null);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoUserRef.current) {
          videoUserRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };
    loadModels();
  }, []);

  let interval;

  useEffect(() => {
    interval = setInterval(async () => {
      if (!videoUserRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoUserRef.current,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (detections.length === 0) {
        console.log("⚠️ Face not detected");
        setCheatCount((prev) => prev + 1);
      } else {
        const box = detections[0].box;

        if (box.x < 50 || box.x > 300) {
          console.log("⚠️ Looking away");
          setCheatCount((prev) => prev + 1);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice =
        voices.find((voice) => voice.name.toLowerCase().includes("female")) ||
        voices.find((voice) => voice.name.toLowerCase().includes("zira")) ||
        voices.find((voice) => voice.name.toLowerCase().includes("samantha"));
      if (femaleVoice) {
        setSelectVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice =
        voices.find((voice) => voice.name.toLowerCase().includes("male")) ||
        voices.find((voice) => voice.name.toLowerCase().includes("david")) ||
        voices.find((voice) => voice.name.toLowerCase().includes("mark"));
      if (maleVoice) {
        setSelectVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectVoice(voices[0]);
      setVoiceGender("female");
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!selectVoice || !window.speechSynthesis) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanizeText = text.replace(/,/g, ",...").replace(/\./g, ". ...");

      const utterance = new SpeechSynthesisUtterance(humanizeText);

      utterance.voice = selectVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      const isFeedbackSpeech = !!feedback && text === feedback;

      utterance.onstart = () => {
        setIsAiPlaying(true);

        if (isFeedbackSpeech) {
          setIsFeedbackPlaying(true);
        }

        setIsTimerRunning(false);
        StopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;

        setIsAiPlaying(false);
        setIsFeedbackPlaying(false);

        if (!isFeedbackSpeech) {
          setTimeLeft(currentQuestion.timeLimit || 60);
          setIsTimerRunning(true);
        }

        if (ismicOn && !isFeedbackSpeech) {
          StartMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectVoice) return;
    const runInterview = async () => {
      if (isIntro) {
        await speakText(
          `Hello ${userName}, welcome to your interview. My name is Zira, I am your AI interviewer. I will be asking you a series of questions.`,
        );

        await new Promise((r) => setTimeout(r, 600));

        await speakText(`Let's start with the first question.`);

        setIsIntro(false);

        await speakText(currentQuestion.question);
        if (ismicOn) {
          StartMic();
        }
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));
        if (currentQuestionIndex === questions.length - 1) {
          await speakText(
            `Alright, this question might be a bit challenging for you ${userName}`,
          );
        }

        await speakText(`${currentQuestion.question}`);
        if (ismicOn) {
          StartMic();
        }
      }
    };

    runInterview();
  }, [selectVoice, isIntro, currentQuestionIndex]);

  const increaseIndex = async () => {
    setIsTimerRunning(false);
    setAnswer("");
    setFeedback("");

    if (currentQuestionIndex + 1 >= questions.length) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    if (isIntro) return;
    if (!currentQuestion) return;
    if (timeleft === 0 && !isSubmitting && !feedback) {
      submitAnswer();
    }
  }, [timeleft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const finishInterview = async () => {
    StopMic();
    setIsMicOn(false);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/interview/finish`,
        {
          interviewId,
          cheatCount 
        },
        { withCredentials: true }
      );

      onFinish(result.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognition.onend = () => {
      if (ismicOn && !isAiPlaying) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const StartMic = () => {
    if (recognitionRef.current && !isAiPlaying) {
      try {
        recognitionRef.current.start();
      } catch (e) {
      }
    }
  };

  const StopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (ismicOn) {
      StopMic();
    } else {
      StartMic();
    }

    setIsMicOn(!ismicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;

    setIsTimerRunning(false);
    StopMic();
    setIsSubmitting(true);

    try {
      let result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/interview/submit-answers`,
        {
          interviewId,
          questionIndex: currentQuestionIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeleft,
        },
        { withCredentials: true },
      );

      const feedbackText = result.data.feedback;
      setFeedback(feedbackText);

      setTimeout(async () => {
        await speakText(feedbackText);

        if (currentQuestionIndex + 1 >= questions.length) {
          finishInterview(); 
        } else {
          increaseIndex();
        }

        setIsSubmitting(false);
      }, 100);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const hasAborted = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !hasAborted.current) {
        hasAborted.current = true;
        abortInterview();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const abortInterview = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/interview/abort`,
        { interviewId },
        { withCredentials: true },
      );

      alert("Interview aborted due to tab switching");

      onFinish({ status: "aborted" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"/>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl min-h-[85vh] bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 flex flex-col lg:flex-row overflow-hidden relative z-10"
      >
        
        {/* LEFT SIDE - AI SECTION */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-[45%] bg-gradient-to-br from-blue-900/30 to-gray-900/30 flex flex-col items-center p-6 md:p-8 space-y-6 border-r border-gray-700/30"
        >
          {/* AI Video */}
          <motion.div
            className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative bg-black border border-gray-700/50"
            whileHover={{ scale: 1.02 }}
          >
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover aspect-video"
            />
            
            {isAiPlaying && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-green-500/50 rounded-2xl"
              />
            )}
          </motion.div>

          {/* AI Subtitle */}
          <AnimatePresence>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-sm bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-500/30 rounded-xl shadow-lg p-4"
              >
                <p className="text-gray-200 text-sm md:text-base font-medium leading-relaxed text-center">
                  {subtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-sm bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Interview Status</span>
              {isAiPlaying && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm font-bold text-green-400 flex items-center gap-1"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full"/>
                  AI Speaking
                </motion.span>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

            {!isIntro && !isAiPlaying && !isFeedbackPlaying && (
              <div className="flex justify-center">
                <Timer
                  timeLeft={timeleft}
                  totalTime={currentQuestion?.timeLimit || 60}
                />
              </div>
            )}

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

            <div className="grid grid-cols-2 gap-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {currentQuestionIndex + 1}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Question</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {questions.length}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
              </motion.div>
            </div>

            {cheatCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2"
              >
                <HiExclamationTriangle className="text-red-400" size={18}/>
                <span className="text-xs text-red-300">Detection events: {cheatCount}</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - ANSWER SECTION */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex-1 flex flex-col p-6 md:p-8 space-y-4"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent mb-2">
              Your Response
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"/>
          </motion.div>

          {/* Question Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0"
          >
            {!isIntro && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="text-base md:text-lg font-bold text-white bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
                  {currentQuestion?.question}
                </div>
              </div>
            )}
          </motion.div>

          {/* Answer Textarea */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 flex flex-col min-h-[300px]"
          >
            <textarea
              placeholder="Speak into your microphone or type your answer here..."
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="flex-1 w-full bg-gray-800/50 text-white placeholder-gray-500 p-4 md:p-6 rounded-xl resize-none outline-none border border-gray-700/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
          </motion.div>

          {/* Controls or Feedback */}
          {!feedback ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMic}
                className={`w-14 h-14 flex items-center justify-center rounded-full font-bold shadow-lg transition-all duration-300 ${
                  ismicOn
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-blue-500/50 text-white'
                    : 'bg-gradient-to-br from-red-500 to-red-600 hover:shadow-red-500/50 text-white'
                }`}
                title={ismicOn ? "Mic On" : "Mic Off"}
              >
                {ismicOn ? (
                  <FaMicrophone size={22} />
                ) : (
                  <FaMicrophoneSlash size={22} />
                )}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting || !answer.trim()}
                whileHover={{ scale: !isSubmitting && answer.trim() ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-bold py-3 md:py-4 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⏳</motion.span>
                    Submitting...
                  </span>
                ) : (
                  "Submit Answer"
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-green-500/40 rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <HiCheckCircle className="text-green-400" size={24}/>
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-green-300 uppercase mb-2">AI Feedback</p>
                    <p className="text-gray-200 leading-relaxed">
                      {feedback}
                    </p>
                  </div>
                </div>

                {currentQuestionIndex + 1 < questions.length && (
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={increaseIndex}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Next Question <FaArrowRight size={18} />
                  </motion.button>
                )}

                {currentQuestionIndex + 1 === questions.length && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={finishInterview}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    ✓ Complete Interview
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* User Camera */}
      {/* <motion.video
        ref={videoUserRef}
        autoPlay
        muted
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed top-4 right-4 w-36 h-28 rounded-xl border-3 border-blue-500/50 shadow-2xl object-cover z-20 bg-black"
      /> */}
    </div>
  );
};

export default Step2Interview;
