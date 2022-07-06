import useProfileEditor from "./useProfileEditor";

const useRoleplayEditState = (initialvalue) => {
  const { setEditValue, getEditValue, commit } = useProfileEditor({
    roleplay: initialvalue,
  });
  const short = getEditValue("roleplay").short;
  const setShort = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), short:value})
  }
  const long = getEditValue("roleplay").long;
  const setLong = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), long:value})
  }
  const fic = getEditValue("roleplay").fic;
  const setFic = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), fic:value})
  }
  const wen = getEditValue("roleplay").wen;
  const setWen = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), wen:value})
  }
  const draw = getEditValue("roleplay").draw;
  const setDraw = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), draw:value})
  }
  const fun = getEditValue("roleplay").fun;
  const setFun = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), fun:value})
  }
  const drama = getEditValue("roleplay").drama;
  const setDrama = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), drama:value})
  }
  const roman = getEditValue("roleplay").roman;
  const setRoman = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), roman:value})
  }
  const ero = getEditValue("roleplay").ero;
  const setEro = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), ero:value})
  }
  const friendship = getEditValue("roleplay").friendship;
  const setFriendship = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), friendship:value})
  }
  const horror = getEditValue("roleplay").horror;
  const setHorror = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), horror:value})
  }
  const thriller = getEditValue("roleplay").thriller;
  const setThriller = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), thriller:value})
  }
  const action = getEditValue("roleplay").action;
  const setAction = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), action:value})
  }
  const fanta = getEditValue("roleplay").fanta;
  const setFanta = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), fanta:value})
  }
  const retro = getEditValue("roleplay").retro;
  const setRetro = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), retro:value})
  }
  const sci = getEditValue("roleplay").sci;
  const setSci = (value) => {
    setEditValue("roleplay", {...getEditValue("roleplay"), sci:value})
  }
  
  return {
            short, setShort, 
            long, setLong, 
            fic, setFic, 
            wen, setWen, 
            draw, setDraw, 
            fun, setFun, 
            drama, setDrama, 
            roman, setRoman, 
            ero, setEro, 
            friendship, setFriendship, 
            horror, setHorror, 
            thriller, setThriller, 
            action, setAction, 
            fanta, setFanta, 
            retro, setRetro, 
            sci, setSci ,
            commit
        };
};

export default useRoleplayEditState;