"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Types definitions
type User = {
  id: string;
  name: string;
  avatar: string;
  university: string;
  major: string;
};

type Comment = {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  likes: number;
  replies: Reply[];
};

type Reply = {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  likes: number;
};

type Thread = {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  user: User;
  likes: number;
  comments: Comment[];
  category: {
    id: string;
    name: string;
  };
};

const ThreadPage = () => {
  const params = useParams();
  const router = useRouter();
  const [thread, setThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<{ commentId: string; username: string } | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Mock current user
  const currentUser: User = {
    id: "user-123",
    name: "محمد الراشدي",
    avatar: "/images/avatar-1.jpg",
    university: "جامعة السلطان قابوس",
    major: "هندسة البرمجيات",
  };

  useEffect(() => {
    // Simulate fetching thread data
    setTimeout(() => {
      // Mock thread data
      const mockThread: Thread = {
        id: params.id as string,
        title: "كيف يمكنني تحسين مهارات الكتابة الأكاديمية؟",
        content: `أنا طالب في السنة الثانية في كلية الآداب والعلوم الاجتماعية، وأواجه صعوبة في كتابة الأبحاث الأكاديمية. هل لدى أحد نصائح حول كيفية تحسين مهارات الكتابة الأكاديمية؟ خاصة فيما يتعلق بالتنظيم وصياغة الأفكار بشكل منطقي.

أحاول قراءة المزيد من الأبحاث الأكاديمية للتعرف على الأسلوب، لكن لا يزال لدي مشكلة في تطبيق ذلك في كتاباتي الخاصة.

شكراً لمساعدتكم!`,
        timestamp: "2025-04-14T10:30:00Z",
        user: {
          id: "user-456",
          name: "عبدالله الحارثي",
          avatar: "/images/avatar-2.jpg",
          university: "جامعة السلطان قابوس",
          major: "اللغة العربية والآداب",
        },
        likes: 18,
        category: {
          id: "cat-1",
          name: "المهارات الأكاديمية",
        },
        comments: [
          {
            id: "comment-1",
            content: "أنصحك بالبدء بإنشاء مخطط تفصيلي قبل الشروع في الكتابة. هذا ساعدني كثيراً في تنظيم أفكاري. حاول أيضاً أن تخصص وقتاً للمراجعة والتحرير بعد الانتهاء من المسودة الأولى.",
            user: {
              id: "user-789",
              name: "سارة المعولي",
              avatar: "/images/avatar-3.jpg",
              university: "جامعة نزوى",
              major: "اللغة الإنجليزية",
            },
            timestamp: "2025-04-14T11:15:00Z",
            likes: 7,
            replies: [
              {
                id: "reply-1",
                content: "متفق تماماً مع سارة. المخطط التفصيلي يساعد كثيراً. أيضاً أنصحك بزيارة مركز الكتابة في الجامعة إن وجد، فهم يقدمون خدمات ممتازة للطلاب.",
                user: {
                  id: "user-101",
                  name: "أحمد السعيدي",
                  avatar: "/images/avatar-4.jpg",
                  university: "جامعة السلطان قابوس",
                  major: "علم النفس",
                },
                timestamp: "2025-04-14T12:00:00Z",
                likes: 3,
              }
            ]
          },
          {
            id: "comment-2",
            content: "هناك دورات مجانية على الإنترنت خاصة بالكتابة الأكاديمية. أخذت دورة من موقع Coursera وساعدتني كثيراً. يمكنني إرسال الرابط لك إذا أردت.",
            user: {
              id: "user-202",
              name: "مريم البلوشي",
              avatar: "/images/avatar-5.jpg",
              university: "الجامعة الألمانية للتكنولوجيا",
              major: "إدارة الأعمال",
            },
            timestamp: "2025-04-14T13:45:00Z",
            likes: 5,
            replies: []
          }
        ]
      };

      setThread(mockThread);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleLikeThread = () => {
    if (thread) {
      setThread({
        ...thread,
        likes: thread.likes + 1
      });
    }
  };

  const handleLikeComment = (commentId: string) => {
    if (thread) {
      const updatedComments = thread.comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });

      setThread({
        ...thread,
        comments: updatedComments
      });
    }
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    if (thread) {
      const updatedComments = thread.comments.map(comment => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === replyId) {
              return { ...reply, likes: reply.likes + 1 };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });

      setThread({
        ...thread,
        comments: updatedComments
      });
    }
  };

  const handleAddComment = () => {
    if (!comment.trim() || !thread) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content: comment,
      user: currentUser,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setThread({
      ...thread,
      comments: [newComment, ...thread.comments]
    });

    setComment("");
  };

  const handleAddReply = () => {
    if (!replyContent.trim() || !replyTo || !thread) return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      content: replyContent,
      user: currentUser,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    const updatedComments = thread.comments.map(comment => {
      if (comment.id === replyTo.commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });

    setThread({
      ...thread,
      comments: updatedComments
    });

    setReplyTo(null);
    setReplyContent("");
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">المنشور غير موجود</h1>
        <button 
          onClick={() => router.push('/forum')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          العودة إلى المنتدى
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-OM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex mb-6 text-sm text-gray-600">
        <Link href="/forum" className="hover:text-blue-500">
          المنتدى
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/forum/category/${thread.category.id}`} className="hover:text-blue-500">
          {thread.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{thread.title.substring(0, 30)}...</span>
      </div>

      {/* Thread Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
              <Image 
                src={thread.user.avatar}
                alt={thread.user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{thread.user.name}</h3>
              <p className="text-sm text-gray-600">{thread.user.university} • {thread.user.major}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{formatDate(thread.timestamp)}</p>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
        <div className="mb-6 whitespace-pre-line">{thread.content}</div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button 
            onClick={handleLikeThread}
            className="flex items-center text-gray-600 hover:text-blue-500"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
            </svg>
            {thread.likes} إعجاب
          </button>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            {thread.comments.length} تعليق
          </div>
        </div>
      </div>

      {/* Add Comment */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">أضف تعليقاً</h2>
        <div className="flex">
          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <Image 
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شارك أفكارك حول هذا الموضوع..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows={3}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              نشر التعليق
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">التعليقات ({thread.comments.length})</h2>
        
        {thread.comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">لا توجد تعليقات بعد. كن أول من يعلق!</p>
        ) : (
          <div className="space-y-8">
            {thread.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{comment.user.name}</h3>
                      <p className="text-xs text-gray-600">{comment.user.university} • {comment.user.major}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                </div>
                
                <div className="mr-14 mb-3">{comment.content}</div>
                
                <div className="flex items-center mr-14 mb-4">
                  <button 
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center text-sm text-gray-600 hover:text-blue-500 mr-4"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    {comment.likes}
                  </button>
                  <button 
                    onClick={() => setReplyTo({ commentId: comment.id, username: comment.user.name })}
                    className="flex items-center text-sm text-gray-600 hover:text-blue-500"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                    </svg>
                    رد
                  </button>
                </div>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mr-14 space-y-4 mb-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                              <Image 
                                src={reply.user.avatar}
                                alt={reply.user.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{reply.user.name}</h4>
                              <p className="text-xs text-gray-600">{reply.user.university} • {reply.user.major}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(reply.timestamp)}</p>
                        </div>
                        
                        <div className="mr-11 mb-2">{reply.content}</div>
                        
                        <div className="flex items-center mr-11">
                          <button 
                            onClick={() => handleLikeReply(comment.id, reply.id)}
                            className="flex items-center text-xs text-gray-600 hover:text-blue-500"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                            </svg>
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply Box */}
                {replyTo && replyTo.commentId === comment.id && (
                  <div className="mr-14 mt-4">
                    <div className="text-sm text-gray-600 mb-2">
                      الرد على <span className="font-semibold">{replyTo.username}</span>:
                    </div>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                      rows={2}
                    ></textarea>
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => setReplyTo(null)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={handleAddReply}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
                      >
                        إرسال
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadPage; 