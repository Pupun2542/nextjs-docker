import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Personal } from "./pesonal";
import { Active } from "./active";
import { EditPersonal } from "./pesonaledit";
import useProfileState from "../../src/hook/useProfileState";
import { EditActive } from "./activeedit";

import { Roleplay } from "./roleplay";
import { Editroleplay } from "./roleplayedite";

import { Relationship } from "./relationship";
import { Editrelationship } from "./relationshipedit";

import { Playedcom } from "./playedcom";
import { Editplayedcom } from "./playedcomedit";

import { Condition } from "./condition";
import { Editcondition } from "./conditionedit";
import { useApp } from "../../src/hook/local";

export const About = ({ data, onRefresh }) => {
  const { auth } = useApp()
  const { isOpen, onOpen, onClose } = useProfileState({
    personal: false,
    roleplay: false,
    active: false,
    relationship: false,
    playedcom: false,
    condition: false,
  });
  const isOwner = data.uid == auth.currentUser.uid;
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
          isOwner = {isOwner}
        ></Personal>
      )}

      {isOpen("roleplay") ? (
        <Editroleplay
          onFinish={() => onClose("roleplay")}
          value={data.roleplay}
          onRefresh={onRefresh}
        ></Editroleplay>
      ) : (
        <Roleplay
          onEdit={() => onOpen("roleplay")}
          value={data.roleplay}
          isOwner = {isOwner}
        ></Roleplay>
      )}

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
          isOwner = {isOwner}
        ></Active>
      )}

      {isOpen("relationship") ? (
        <Editrelationship
          onFinish={() => onClose("relationship")}
          value={data.relationship}
          onRefresh={onRefresh}
        ></Editrelationship>
      ) : (
        <Relationship
          onEdit={() => onOpen("relationship")}
          value={data.relationship}
          isOwner = {isOwner}
        ></Relationship>
      )}

      {isOpen("playcom") ? (
        <Editplayedcom
          onFinish={() => onClose("playcom")}
          value={data.playcom}
          onRefresh={onRefresh}
        ></Editplayedcom>
      ) : (
        <Playedcom
          onEdit={() => onOpen("playcom")}
          value={data.playcom}
          isOwner = {isOwner}
        ></Playedcom>
      )}

      {isOpen("condition") ? (
        <Editcondition
          onFinish={() => onClose("condition")}
          value={data.condition}
          onRefresh={onRefresh}
        ></Editcondition>
      ) : (
        <Condition
          onEdit={() => onOpen("condition")}
          value={data.condition}
          isOwner = {isOwner}
        ></Condition>
      )}
    </Flex>
  );
};
