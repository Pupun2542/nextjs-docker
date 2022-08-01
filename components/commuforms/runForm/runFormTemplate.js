import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { collection, doc } from "firebase/firestore";
import { Plus } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useApp } from "../../../src/hook/local";

export const RunFormTemplate = () => {
  const dataList = [
    {
      id: "abc",
      name: "john",
    },
    {
      id: "def",
      name: "doe",
    },
  ];

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const [form, setForm] = useState([]);
  const { db } = useApp();
  const template = {
    id: doc(collection(db, "group")).id,
    title: "",
    description: "",
    type: 0,
    value: "",
  };
  const onFormIndexChange = (curr, dest) => {
    if (dest !== 0 || dest !== form.length) {
      let newform = [...form];
      let val = form[curr];
      // if (dest > curr) {

      // }
      newform = newform.filter((v, i) => i !== curr);
      newform.splice(dest, 0, val);
      setForm(newform);
    }
  };
  const onFormValueChange = (index, value) => {
    let newform = [...form];
    newform[index] = value;
    setForm(newform);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let newform = [...form];
    const [reorderedItem] = newform.splice(result.source.index, 1);
    newform.splice(result.destination.index, 0, reorderedItem);
    setForm(newform);
  };

  return (
    <Box>
      <Button onClick={() => setForm([...form, template])}>add</Button>
      <Button>submit</Button>
      {winReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="formitem">
            {(provided) => (
              <SimpleGrid columns={1} spacing={3}
                className="formitem"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {form.map((fItem, index) => (
                  <FormItem
                    index={index}
                    value={fItem}
                    key={fItem.id}
                    onValueChange={(v) => onFormValueChange(index, v)}
                    //   onIncrease={() => onFormIndexChange(index, index - 1)}
                    //   onDecrease={() => onFormIndexChange(index, index + 1)}
                    onDelete={() => setForm(form.filter((v, i) => i !== index))}
                  />
                ))}
                {provided.placeholder}
              </SimpleGrid>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};

const TestDrag = ({ id, index, data }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {data.name}
        </li>
      )}
    </Draggable>
  );
};

const FormItem = ({
  index,
  onValueChange,
  onIncrease,
  onDecrease,
  onDelete,
  value,
}) => {
  const onInputChange = (field, val) => {
    onValueChange({ ...value, [field]: val });
  };
  return (
    <Draggable draggableId={value.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          
          bg={"white"}
        >
          <Box textAlign={"center"} {...provided.dragHandleProps}><Text display={"inline-block"}>drag here</Text></Box>
          <Box>
            <Text>title</Text>
            <Input
              type="text"
              value={value.title}
              onChange={(e) => onInputChange("title", e.target.value)}
            />
          </Box>
          <Box>
            <Text>description</Text>
            <Input
              type="text"
              value={value.description}
              onChange={(e) => onInputChange("description", e.target.value)}
            />
          </Box>
          <Box>
            <Text>value</Text>
            <Input
              type="text"
              value={value.value}
              onChange={(e) => onInputChange("value", e.target.value)}
            />
          </Box>
          <Box>
            <Button onClick={onIncrease}>shift up</Button>
            <Button onClick={onDecrease}>shift down</Button>
            <Button onClick={onDelete}>delete</Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
