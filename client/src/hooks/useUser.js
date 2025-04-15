const useUser = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
  
    return {
      user: userData,
    };
  };
  
  export default useUser;
  