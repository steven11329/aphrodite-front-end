import { useState, useEffect } from 'react';

export default function useInfiniteScroll(ElementID) {
  const [isReachBottom, setIsReachBottom] = useState(false);

  useEffect(() => {
    const el = document.getElementById(ElementID);
    function onScroll() {
      if (el.clientHeight + el.scrollTop >= el.scrollHeight) {
        setIsReachBottom(true);
      }
    }
    el.addEventListener('scroll', onScroll);
    el.addEventListener('touchmove', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [ElementID]);

  return [isReachBottom, setIsReachBottom];
}
