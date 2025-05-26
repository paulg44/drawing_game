// const handleSaveImage = async () => {
//   // const convertToBase64 = (blob) => {
//   //   return new Promise((resolve, reject) => {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => resolve(reader.result);
//   //     reader.onerror = reject;
//   //     reader.readAsDataURL(blob);
//   //   });
//   // };

//   const userImageData = stageRef.current.toDataURL();
//   const base64String = userImageData.split(",")[1];

//   try {
//     console.log(
//       "User Image Base64 (first 50 chars):",
//       userImageData.slice(0, 50)
//     );

//     const saveResponse = await fetch("/save-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userImage: base64String,
//         metadata: randomItem,
//       }),
//     });

//     if (!saveResponse.ok) {
//       throw new Error(`Server error: ${saveResponse.statusText}`);
//     }

//     const data = await saveResponse.json();
//     console.log("Image saved successfully client:", data);
//   } catch (error) {
//     console.error("Error saving image client side:", error);
//   }
// };
