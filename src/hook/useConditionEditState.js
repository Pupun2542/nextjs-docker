import useProfileEditor from "./useProfileEditor";

const useConditionEditState = (initialvalue) => {
    const { setEditValue, getEditValue, commit } = useProfileEditor({
        active: initialvalue
    });
    const doit = getEditValue("condition").doit
    const getDoit = (value) => {
        setEditValue("condition", {...getEditValue("condition"), doit:value})
    }
    const dontit = getEditValue("condition").dontit
    const getDontit = (value) => {
        setEditValue("condition", {...getEditValue("condition"), dontit:value})
    }
    const pobia = getDontit("condition").pobia
    const getPobia = (value) => {
        setEditValue("condition", {...getEditValue("condition"), pobia:value})
    }
    const demand = getEditValue("condition").demand
    const getDemand = (value) => {
        setEditValue("condition", {...getEditValue("condition"), demand:value})
    }
    const ref = getEditValue("condition").ref
    const getRef = (value) => {
        setEditValue("condition", {...getEditValue("condition"), ref:value})
    }
    const condition = getEditValue("condition").condition
    const getCondition = (value) => {
        setEditValue("condition", {...getEditValue("condition"), condition:value})
    }
    const othercondition = getEditValue("condition").othercondition;
    const getOthercondition = (value) => {
        setEditValue("condition", {...getEditValue("condition"), othercondition:value})
    }
    return { doit, getDoit, dontit, getDontit, pobia, getPobia, demand, getDemand, ref, getRef, condition, getCondition, othercondition, getOthercondition, commit }
}

export default useConditionEditState;