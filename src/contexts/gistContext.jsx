import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";  // Adjust the path to your AuthContext file


export const GistContext = createContext({
  mygists:[],
  gists: [],
  users: [],
  createGist: (value,description,file)=>{}
});

export function GistsProvider(props) {
  const gistContext= useContext(AuthContext);  // Get the current logged-in user

  const [gists, setGists] = useState([
    {
      code: `
      #requires -Module Az.Accounts
      $verbosePreference = 'continue'
      function ConvertFrom-JWTtoken {
       <#
       .NOTES
       Lovingly borrowed from: https://www.michev.info/blog/post/2140/decode-jwt-access-and-id-tokens-via-powershell
       #>
        [cmdletbinding()]
        param([Parameter(Mandatory = $true)][string]$token)
        
      `,
      id:1,
      stars:5,
      forks:1,
      files:1,
      comments:1,
    },
    {
      code: `
      #requires -Module Az.Accounts
      $verbosePreference = 'continue'
      function ConvertFrom-JWTtoken {
       <#
       .NOTES
       Lovingly borrowed from: https://www.michev.info/blog/post/2140/decode-jwt-access-and-id-tokens-via-powershell
       #>
        [cmdletbinding()]
        param([Parameter(Mandatory = $true)][string]$token)
        
      `,
      id:2,
      stars:0,
      forks:1,
      files:1,
      comments:3,

    },
    {
      code: `
     # This is a basic workflow to help you get started with Actions
# workflow - цепочка действий
# Имя процесса Билдится на всех типах 📦 🐍
name: CMake Build Matrix

# Controls when the action will run. Triggers the workflow on push
on: 
  push:
  pull_request:
  release:
        
      `,
      id:3,
      stars:10,
      forks:4,
      files:1,
      comments:4,

    },
  ]);

  const [users, setUsers] = useState([
    {
      username: "JustinGrote ",
      userId: "@JustinGrote123",
      gistName: " Start-MSIEmulator.ps1",
      CreationDate: "sep 25",
      description:"A Managed Identity Emulator for testing Managed Identities locally. Returns a token from your"
    },
    {
      username: "NickNaso",
      userId: "@NickNaso123",
      gistName: "cpp.yml",
      CreationDate: "july 21",
      description:"Example of Github action for C++ project"
    },
    {
      username: "valexa ",
       userId: "@valexa123",
      gistName: "editNestedDict",
      CreationDate: "dec 25",
      description:"a method for changing objects inside deeply nested dictionaries"
    },
  ]);
  useEffect(() => {
    const storedGists = localStorage.getItem("gists");
    const storedUsers = localStorage.getItem("users");

    if (storedGists) {
      setGists(JSON.parse(storedGists));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  
  const createGist = (value, description,file) => {
    setGists((prev) => {
      const newGist = {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        code: value,
        description: description,
        stars:0,
        forks:0 ,
        comments:0,
        gistName:file
      };
      const updatedGists = [...prev, newGist];
  
      // Save the updated gists array to localStorage
      localStorage.setItem("gists", JSON.stringify(updatedGists));
  
      // Return the updated gists array to update the state
      return updatedGists;
    });

    setUsers((prevUsers) => {
      const newUser = {
        username: "eyahellal",
        userId: 500,
        gistName: file,
        creationDate: new Date().toLocaleDateString(), // You can customize the date format
        description: description,
      };
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };
  
  

  return (
    <GistContext.Provider
      value={{
        gists,
        users,
        createGist,
      }}
    >
      {props.children}
    </GistContext.Provider>
  );
}
