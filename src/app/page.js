"use client";

import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import { BsHearts, BsSuitHeart } from "react-icons/bs";

export default function Home() {
  const [noPos, setNoPos] = useState({ top: "61%", left: "50%", topRes: "78%", leftRes: "42%" });
  const [style, setStyle] = useState({});
  const attempts = useRef(0);

  const handleYesClick = () => {
    console.log("Button value:", "Yes"); // 👈 LOGS VALUE
  };

  const formRef = useRef(null);
  const choiceRef = useRef(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const sendChoice = (value) => {
    if (value === "Yes") {
      fireConfetti(); // 🎉 CONFETTI!!!
    }

    choiceRef.current.value = value;
    formRef.current.submit();
  };

  const moveNoButton = () => {
    attempts.current += 1;

    const padding = 20;
    const buttonSize = 100; // approx width/height of button

    const maxX = window.innerWidth - buttonSize - padding;
    const maxY = window.innerHeight - buttonSize - padding;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    const rotate = Math.random() * 40 - 20; // -20deg → 20deg
    const scale = 0.9 + Math.random() * 0.4;

    setNoPos({
      top: `${randomY}px`,
      left: `${randomX}px`,
      topRes: `${randomY + 100}px`,
      leftRes: `${randomX}px`,
    });

    setStyle({
      transform: `rotate(${rotate}deg) scale(${scale})`,
      transition: `all ${Math.max(0.08, 0.25 - attempts.current * 0.01)}s ease`,
    });
  };

  return (
    <>
      <Flex bgColor={"#FFE3E9"} h="100vh" justify={"center"} align={"center"}>
        <Flex
          w={{ base: "90%", md: "850px" }}
          h="450px"
          bg={"#fff"}
          borderRadius={"20px"}
          boxShadow="0 20px 40px rgba(0, 0, 0, 0.08)"
          justify={"center"}
          align={"center"}
          pos={"relative"}
        >
          <Box pos="absolute" top="2%" left="2%">
            <BsSuitHeart color="#fe6e942a " size={"50px"} />
          </Box>
          <Box pos="absolute" bottom="2%" left="2%">
            <BsSuitHeart color="#fe6e942a " size={"50px"} />
          </Box>
          <Box pos="absolute" top="2%" right="2%">
            <BsSuitHeart color="#fe6e942a " size={"50px"} />
          </Box>
          <Box pos="absolute" bottom="2%" right="2%">
            <BsSuitHeart color="#fe6e942a " size={"50px"} />
          </Box>
          <Box
            position="absolute"
            top="2%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="140px"
            h="140px"
            borderRadius="full"
            overflow="hidden"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.08)"
          >
            <Image
              src="/aya.jpg"
              alt="Profile picture"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Box
            position="absolute"
            top="35%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Image
              src="/img1.jpg"
              w="120px"
              h="120px"
              style={{ objectFit: "contain" }}
              fill
            />
          </Box>
          <Box position="absolute" top="50%" textAlign={"center"}>
            <Text fontSize={"2xl"} fontWeight={600} color='#000'>
              Edrina, will you be my valentine?
            </Text>
          </Box>
          <form
            id="formspree-form"
            onSubmit={async (e) => {
              e.preventDefault(); // prevent default page reload

              const formData = new FormData(e.target);

              try {
                const response = await fetch(
                  "https://formspree.io/f/xwvnenrj",
                  {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                  },
                );

                if (response.ok) {
                  alert("Yayyy! You are now taken!❤️");
                  e.target.reset(); // optional: reset form fields
                } else {
                  alert("Oops! Something went wrong.");
                }
              } catch (err) {
                alert("Oops! Something went wrong.");
              }
            }}
          >
            <input type="hidden" name="choice" id="choice" value="YES!!" />
            <Box w="100vw" h="100vh" position="relative">
              {/* YES BUTTON — stays normal */}
              <Flex
                direction={{ base: "column", md: "row" }}
                position="absolute"
                top="60%"
                left="40%"
                gap="20px"
              >
                <Button
                  bg="#E5195E"
                  color="#fff"
                  borderRadius="30px"
                  fontSize="20px"
                  px="30px"
                  py="25px"
                  type="submit"
                  onClick={() => sendChoice("Yes")}
                >
                  Yes
                </Button>
              </Flex>

              {/* NO BUTTON — runs away */}
              <Button
                position={"fixed"}
                top={{ base: noPos.topRes, md: noPos.top }}
                left={{ base: noPos.leftRes, md: noPos.left }}
                bg="#d3cfcf"
                color="#000"
                borderRadius="20px"
                px="30px"
                py="20px"
                transition="top 0.15s ease, left 0.15s ease"
                onMouseEnter={moveNoButton} // desktop
                onTouchStart={moveNoButton} // mobile
                onMouseMove={moveNoButton}
                onFocus={moveNoButton}
                style={style}
              >
                No
              </Button>
            </Box>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
