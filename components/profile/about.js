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
        ></Playedcom>
      )}

      {isOpen("condition") ? (
        <Editplayedcom
          onFinish={() => onClose("condition")}
          value={data.condition}
          onRefresh={onRefresh}
        ></Editplayedcom>
      ) : (
        <Condition
          onEdit={() => onOpen("condition")}
          value={data.condition}
        ></Condition>
      )}
    </Flex>
  );
};
