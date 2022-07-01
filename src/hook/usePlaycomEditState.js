import useProfileEditor from "./useProfileEditor";

const usePlaycomEditState = (initialvalue) => {
    const { setEditValue, getEditValue, commit } = useProfileEditor({
        active: initialvalue
    });
    const survival = getEditValue("playcom").survival
    const setSurvival = (value) => {
        setEditValue("playcom", {...getEditValue("playcom"), survival:value})
    }
    const slow = getEditValue("playcom").slow
    const setSlow = (value) => {
        setEditValue("playcom", {...getEditValue("playcom"), slow:value})
    }
    const slowsur = getEditValue("playcom").slowsur
    const setSlowsur = (value) => {
        setEditValue("playcom", {...getEditValue("playcom"), slowsur:value})
    }
    const vote = getEditValue("playcom").vote
    const setVote = (value) => {
        setEditValue("playcom", {...getEditValue("playcom"), vote:value})
    }
    // ตัวไหนที่เป็น String ไม่เขียนให้นะคะ ไม่กล้าเขียนไม่รู้มันจะถูกรึเปล่า inter
    return ( survival, setSurvival, slow, setSlow, slowsur, setSlowsur, vote, setVote, commit );
}
export default usePlaycomEditState;