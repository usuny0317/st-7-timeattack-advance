import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useTodoQuery } from "../tanstack/todoquery";

export default function Home() {
  // TODO: 필수: useQuery 로 리팩터링 하세요.
  // TODO: 선택: useQuery 로 리팩터링 후, 커스텀훅 useTodosQuery 로 정리해 보세요.

  //const [isLoading, setIsLoading] = useState(true);
  //const [error, setError] = useState(null);
  //const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await todoApi.get("/todos");
      return response.data;
      //setData(response.data);
    } catch (err) {
      //setError(err);
      throw Error(err); //맞나?
    }
  };

  const { data, isPending, isError, error } = useTodoQuery(
    ["todos"],
    fetchData
  );
  //기준이 되는 애를 줘야하는데.. 뭐가 기준이 되지?
  //일단 todos로 두니까 되긴한다.

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }
  if (isError) {
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={fetchData} />
      <TodoList todos={data} />
    </>
  );
}
