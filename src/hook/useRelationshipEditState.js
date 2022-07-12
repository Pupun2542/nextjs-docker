import useProfileEditor from "./useProfileEditor";

const useRelationshipEditState = (initialvalue) => {
    const { setEditValue, getEditValue, commit } = useProfileEditor({
        relationship: initialvalue,
    });
    const heroto = getEditValue("relationship").heroto;
    const setHeroto = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), heroto:value})
    }
    const blove = getEditValue("relationship").blove;
    const setBlove = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), blove:value})
    }
    const glove = getEditValue("relationship").glove;
    const setGlove = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), glove:value})
    }
    const nlove = getEditValue("relationship").nlove;
    const setNlove = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), nlove:value})
    }
    const fwb = getEditValue("relationship").fwb;
    const setFwb = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), fwb:value})
    }
    const fz = getEditValue("relationship").fz;
    const setFz = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), fz:value})
    }
    const onenight = getEditValue("relationship").onenight;
    const setOnenight = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), onenight:value})
    }
    // ตัวไหนที่เป็น String ไม่เขียนให้นะคะ ไม่กล้าเขียนไม่รู้มันจะถูกรึเปล่า noplay
    const top = getEditValue("relationship").top;
    const setTop = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), top:value})
    }
    const bottom = getEditValue("relationship").bottom;
    const setBottom = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), bottom:value})
    }
    const switchs = getEditValue("relationship").switchs;
    const setSwitch = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), switchs:value})
    }
    const submissive = getEditValue("relationship").submissive;
    const setSubmissive = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), submissive:value})
    }
    const dominant = getEditValue("relationship").dominant;
    const setDominant = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), dominant:value})
    }
    const taste = getEditValue("relationship").taste;
    const setTaste = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), taste:value})
    }
    const noplay = getEditValue("relationship").noplay;
    const setNoplay = (value) => {
        setEditValue("relationship", {...getEditValue("relationship"), noplay:value})
    }
    // ตัวไหนที่เป็น String ไม่เขียนให้นะคะ ไม่กล้าเขียนไม่รู้มันจะถูกรึเปล่า taste
    return {
        heroto, setHeroto,
        blove, setBlove,
        glove, setGlove,
        nlove, setNlove,
        fwb, setFwb,
        fz, setFz,
        onenight, setOnenight,
        top, setTop,
        bottom, setBottom,
        switchs, setSwitch,
        submissive, setSubmissive,
        dominant, setDominant,
        taste, setTaste,
        noplay, setNoplay,
        commit
    }
}
export default useRelationshipEditState;