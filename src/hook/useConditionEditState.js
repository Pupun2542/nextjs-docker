import useProfileEditor from "./useProfileEditor";

const useConditionEditState = (initialvalue) => {
    const { setEditValue, getEditValue, commit } = useProfileEditor({
        condition: initialvalue
    });
    const doit = getEditValue("condition").doit
    const setDoit = (value) => {
        setEditValue("condition", {...getEditValue("condition"), doit:value})
    }
    const dontit = getEditValue("condition").dontit
    const setDontit = (value) => {
        setEditValue("condition", {...getEditValue("condition"), dontit:value})
    }
    const phobia = getEditValue("condition").phobia
    const setPhobia = (value) => {
        setEditValue("condition", {...getEditValue("condition"), phobia:value})
    }
    const demand = getEditValue("condition").demand
    const setDemand = (value) => {
        setEditValue("condition", {...getEditValue("condition"), demand:value})
    }
    const ref = getEditValue("condition").ref
    const setRef = (value) => {
        setEditValue("condition", {...getEditValue("condition"), ref:value})
    }
    const condition = getEditValue("condition").condition
    const setCondition = (value) => {
        setEditValue("condition", {...getEditValue("condition"), condition:value})
    }
    const othercondition = getEditValue("condition").othercondition;
    const setOthercondition = (value) => {
        setEditValue("condition", {...getEditValue("condition"), othercondition:value})
    }
    return { doit, setDoit, dontit, setDontit, phobia, setPhobia, demand, setDemand, ref, setRef, condition, setCondition, othercondition, setOthercondition, commit }
}

export default useConditionEditState;