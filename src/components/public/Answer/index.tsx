'use client';
import React, { useContext, useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import DiffForHumon from '@/commonUI/DiffForHumon';
import PrimaryButton from '@/commonUI/PrimaryButton';
import SecondaryButton from '@/commonUI/SecondaryButton';
import Link from 'next/link';
import Image from 'next/image';
import {
  checkIsLiked,
  deleteQuestionResponseLike,
  getLawyerById,
  getReviewsCount,
  likeQuestionResponse,
  storeQuestionResponse,
  getUserGenderBySlug

} from '../../../../lib/frontendapi';
import { toast } from 'react-toastify';
import FormTextarea from '@/commonUI/FormTextArea';
import SplitReview from '@/commonUI/SplitReview';
import AuthContext from '@/context/AuthContext';
import { getLawyerImageSrc180x180 } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
  answer: any;
  Key: number;
  loginUser?: any;
}

export default function Answer({ answer, Key, loginUser }: Props) {
  const { user } = useContext(AuthContext)
  const [reviewsCount, setreviewsCount]: any = useState([]);
  const [comment, setcomment]: any = useState(answer.message);
  const [showFullComment, setshowFullComment] = useState(false);
  const [error, seterror] = useState(false);
  const [isLiked, setisLiked]: any = useState(null);
  const [showCommentField, setshowCommentField]: any = useState(false);
  const [isLogin, setisLogin]: any = useState(false);
  const [totalLikes, settotalLikes] = useState(answer.thumbs_up);
  const [totalDeslikes, setTotalDeslikes] = useState(answer.thumbs_down);
  const [gender, setGender] = useState("");


  const handleUser = (id = answer.response_by_member_id) => {
    user?.id && setisLogin(true);
  };

  const handleReviewsCount = (id = answer.response_by_member_id) => {
    id && getReviewsCount(id).then(res => setreviewsCount(res.data[0]));
  };

  const handleIsLiked = (forum_id = answer.response_id, user_id = user?.id) => {

    checkIsLiked({ forum_id: forum_id, user_id: user_id }).then(res => {
      setisLiked(parseInt(res.data[0].is_liked));
      return res.data[0].is_liked;
    });
  };

  useEffect(() => {
    // console.log(answer);
    handleUser(answer.response_by_member_id);
    handleReviewsCount(answer.response_by_member_id);
    handleIsLiked(answer.response_id);
    handleGender()
  }, [loginUser]);

  const handleComment = () => {
    if (comment !== '') {
      const data = {
        forum_id: answer.response_id,
        message: comment
      };
      storeQuestionResponse(data).then(res =>
        res.status === true ? toast.success(res.message) : toast.error(res.message)
      );
      setshowCommentField(false);
      seterror(false);
    } else {
      seterror(true);
    }
  };

  const handleGender = () => {
    getUserGenderBySlug(answer.response_slug)
      .then((res) => {
        // console.log(res.gender);
        setGender(res.gender)
      })
  }

  const handleLikeOrDislike = (like: any) => {
    // alert(isLiked);
    const data = {
      response_id: answer.response_id,
      user_id: user?.id,
      like: like
    };
    isLiked === like
      ? deleteQuestionResponseLike({
        forum_id: answer.response_id,
        user_id: user?.id
      }).then(res => {
        setisLiked(null);
        settotalLikes(res.likes);
        setTotalDeslikes(res.dislikes);
      })
      : likeQuestionResponse(data).then(res => {
        setisLiked(like);
        settotalLikes(res.likes);
        setTotalDeslikes(res.dislikes);
      });

  };

  return (
    <div className="answer-wrapper mb-5" key={`answer-${Key}`}>
      <div className="lawyer-advice">
        <div className="d-flex justify-content-between">
          <h5>
            Posted <DiffForHumon date={answer.response_created_at} />
          </h5>
          {isLogin && answer.response_by_member_id == user?.id && (
            <Image
              src="/icon/edit.png"
              onClick={() =>
                setshowCommentField(
                  (prevShowCommentField: boolean) => !prevShowCommentField,
                )
              }
              style={{ cursor: 'pointer' }}
              width={20}
              height={20}
              alt={'edit'}
            />
          )}
        </div>
        <h6>Connect Legal Verified</h6>
        {showCommentField ? (
          <div className="answer-box col-sm-12">
            <div className="form-group">
              <FormTextarea
                name=""
                label={'Edit your comment:'}
                value={comment}
                error={error}
                maxLength={400}
                onChange={e => setcomment(e.target.value)}
                className={`form-control mt-3`}
                rows={5}
                placeholder="Your answer..." />
            </div>
            <PrimaryButton className="mt-3 " onClick={handleComment}>
              update
            </PrimaryButton>
          </div>
        ) : comment && comment.length > 100 ? (
          <>
            {showFullComment ? comment : comment.substring(0, 100) + '...'}
            <button
              onClick={() =>
                setshowFullComment(
                  (prevshowFullComment: boolean) => !prevshowFullComment,
                )
              }
              className="mb-2 mt-2 d-block">
              {showFullComment ? 'See Less' : 'See More'}
            </button>
          </>
        ) : (
          comment
        )}
        <p></p>
      </div>
      <div className='d-flex'><span>{totalLikes} found this helpful</span> <span style={{ marginLeft: '20px' }}>{totalDeslikes} found this not helpful</span></div>
      <div className="row" id="like-dislikes" key={Key}>
        <div className="col-lg-2  col-6 p-0">
          <div
            className="like-dislike"
            onClick={() => handleLikeOrDislike(1)}
            style={{
              filter: `${isLiked === '1' || isLiked === 1 ? 'unset' : 'grayscale(1)'
                }`,
            }}>
            <img
              src="/images/legal/like.png"
              className="response-like-icons"
              alt="Helpful"
            />
            Helpful
          </div>
        </div>
        <div className="col-lg-3 col-6 p-0">
          <div
            className="like-dislike"
            onClick={() => handleLikeOrDislike(0)}
            style={{
              filter: `${isLiked === '0' || isLiked === 0 ? 'unset' : 'grayscale(1)'
                }`,
            }}>
            <img
              src="/images/legal/dislike.png"
              className="response-like-icons"
            />
            Not Helpful
          </div>
        </div>
      </div>
      <div className="view-profile mt-3 mb-3" key={Key}>
        <div className="row">
          <div className="col-lg-12">
            <div className="user-detail">
              <div className="row">
                <div className="col-lg-2 col-4">
                  <img
                    src={getLawyerImageSrc180x180(
                      answer.profile_image,
                      gender,
                    )}
                    alt="user-image"
                    width={100}
                    height={100}
                  // className="m-img-fixed"
                  />
                </div>
                <div className="col-lg-10 col-8 d-flex justify-content-between">
                  <div className="user-full-detail">
                    <h4>{answer.response_name}</h4>
                    <h6>
                      {answer.designation} <span>{answer.company_name ? 'at' : ''}</span> {answer.company_name}
                    </h6>
                    {
                      answer.review &&
                      <p className="stong-text m-0">
                        <span>
                          <StarIcon
                            width={20}
                            color="#208C84"
                            style={{ marginRight: '5px', height: '30px' }}
                          />
                        </span>
                        <span>
                          <strong className="m-0"></strong>
                        </span>
                        <span><SplitReview review={answer.review} /></span>
                      </p>
                    }
                  </div>
                  <div className="btn-group-right d-none d-lg-block">
                    <Link href={`/find-a-lawyer/${answer.response_slug}`}>
                      <PrimaryButton>View Profile</PrimaryButton>
                    </Link>
                    <Link href={`/contact-us`}>
                      <SecondaryButton className="mt-2 w-100" height={42}>
                        Contact
                      </SecondaryButton>
                    </Link>
                  </div>
                </div>
                <div className="btn-group-right d-block d-lg-none d-flex justify-content-between align-items-center">
                  <div className="w-50 w-style">
                    <Link href={`/find-a-lawyer/${answer.response_name}`}>
                      <PrimaryButton>View Profile</PrimaryButton>
                    </Link>
                  </div>
                  <div className="w-50 w-style">
                    <Link href={`/contact-us`}>
                      <SecondaryButton className="w-100" height={42}>
                        Contact
                      </SecondaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
