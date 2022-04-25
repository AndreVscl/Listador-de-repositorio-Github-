import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";
import "../styles/repositories.scss";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, [username]);
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <input
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <button type="submit">search</button>
      <ul>
        {repositories.length > 0 &&
          repositories.map((repository) => {
            return (
              <RepositoryItem key={repository.name} repository={repository} />
            );
          })}
      </ul>
    </section>
  );
}
