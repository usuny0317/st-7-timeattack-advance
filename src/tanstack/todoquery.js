import { useQuery } from "@tanstack/react-query";

export const useTodoQuery = (queryKey, 받아올함수) => {
  return useQuery({ queryKey, queryFn: 받아올함수 });
};

// 나중에 참고할 흐름~
// 1. 이게 밖에서 쓰여서 값을 줘야해 그러면 return을 해줘야한단 말이지
// 2. 전에 밖에서 이걸 쓸 때 인자를 줬던 것 같으니까 일단 함수를 만들어서 인자를 줘줘
// 3. 맞다 함수 이름 use로 써야함
