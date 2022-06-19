import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Personal } from "./pesonal";
import { Roleplay } from "./roleplay";
import { Active } from "./active";
import { Relationship } from "./relationship";
import { Playedcom } from "./playedcom";
import { Condition } from "./condition";
import { EditPersonal } from "./pesonaledit";
import useProfileState from "../../src/hook/useProfileState";
import { EditActive } from "./activeedit";

export const About = ({ data, onRefresh }) => {
  const { isOpen, onOpen, onClose } = useProfileState({
    personal: false,
    roleplay: false,
    active: false,
    relationship: false,
    playedcom: false,
    condition: false,
  });
  return (
    <Flex direction={"column"}>
      {isOpen("personal") ? (
        <EditPersonal
          onFinish={() => onClose("personal")}
          value={data.personalvalue}
          config={data.personalconfig}
          onRefresh={onRefresh}
        ></EditPersonal>
      ) : (
        <Personal
          onEdit={() => onOpen("personal")}
          value={data.personalvalue}
          config={data.personalconfig}
        ></Personal>
      )}

      <Roleplay></Roleplay>

      {isOpen("active") ? (
        <EditActive
          onFinish={() => onClose("active")}
          value={data.active}
          onRefresh={onRefresh}
        ></EditActive>
      ) : (
        <Active
          onEdit={() => onOpen("active")}
          value={data.active}
        ></Active>
      )}

      <Relationship></Relationship>

      <Playedcom></Playedcom>

      <Condition></Condition>
    </Flex>
  );
};
