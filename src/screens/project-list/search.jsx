
export const Search = ({ users, params, setParams }) => {

  return <form>
    <div>
      <input type="text" value={params.name} onChange={env => setParams({ ...params, name: env.target.value })} />
      <select value={params.personId} onChange={env => setParams({ ...params, personId: env.target.value })}>
        <option value="">负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}