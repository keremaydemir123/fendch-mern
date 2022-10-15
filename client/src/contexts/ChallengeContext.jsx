import React, { createContext, useContext, useMemo } from "react";
import { useAsync } from "../hooks/useAsync";
import { getChallenge } from "../services/challenges";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Context = createContext();

export function useChallenge() {
  return useContext(Context);
}

export function ChallengeProvider({ children }) {
  const { id } = useParams();

  const {
    loading,
    error,
    value: challenge,
  } = useAsync(() => getChallenge(id), [id]);

  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    if (comments == null) return [];
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (challenge?.comments == null) return;
    setComments(challenge.comments);
  }, [challenge?.comments]);

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }

  function updateLocalComment(id, message) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  function deleteLocalComment(id) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  function toggleLocalCommentLike(id, addLike) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likedCount: comment.likeCount + 1,
              likedByMe: true,
            };
          } else {
            return {
              ...comment,
              likedCount: comment.likeCount - 1,
              likedByMe: false,
            };
          }
        }
      });
    });
  }

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  return (
    <Context.Provider
      value={{
        challenge,
        getReplies,
        rootComments: commentsByParentId[null],
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
      }}
    >
      {loading ? <h1>loading</h1> : error ? <h1>{error}</h1> : children}
    </Context.Provider>
  );
}
