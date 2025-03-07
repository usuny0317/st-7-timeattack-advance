import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // TODO: 필수: useMutation 으로 리팩터링 하세요.
  // TODO: 선택: useMutation 으로 리팩터링 후, useTodoMutation 커스텀훅으로 정리해 보세요.

  const queryClient = useQueryClient();

  //버튼 눌럿을 때 동작할거
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate();
  };
  //내부에서 동작할거
  const handleAddTodo = async () => {
    const response = await todoApi.post("/todos", {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });

    return response;
  };

  const mutation = useMutation({
    mutationFn: handleAddTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "todos" });

      setTitle("");
      setContents("");
    },
  });
  /*뮤테이션.. 잘 ..  
  함수... 성공시, 실패시로 나뉘었던 것 같은데 */

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가</button>
    </form>
  );
}
