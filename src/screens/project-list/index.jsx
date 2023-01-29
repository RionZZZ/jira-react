import { useState, useEffect } from "react"
import { cleanObject } from "utils";
import { List } from "./list"
import { Search } from "./search"
import qs from 'qs';


const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {

  const [params, setParams] = useState({
    name: "",
    personId: ""
  })

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [params]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, []);

  return <div>
    <Search params={params} setParams={setParams} users={users} />
    <List list={list} users={users} />
  </div>
}