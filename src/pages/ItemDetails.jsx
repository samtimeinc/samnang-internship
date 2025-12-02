import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [nftDetails, setNftDetails] = useState(null);

  async function renderItem() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    const object = data.find((element) => element.nftId == nftId);
    if (object !== undefined) {
      setNftDetails(object);
    } else {
      alert("NFT not found.");
    }
  }
  console.log(nftDetails);

  useEffect(() => {
    renderItem();
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {nftDetails ? (
                  <img
                    src={nftDetails?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="460px" />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {nftDetails ? (
                    <h2>{nftDetails?.title}</h2>
                  ) : (
                    <Skeleton width="50%" height="50px" />
                  )}

                  <div className="item_info_counts">
                    {nftDetails ? (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        100
                      </div>
                    ) : (
                      <Skeleton width="80px" height="30px" />
                    )}

                    {nftDetails ? (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        74
                      </div>
                    ) : (
                      <Skeleton width="80px" height="30px" />
                    )}
                  </div>
                  {nftDetails ? (
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                  ) : (
                    <Skeleton width="100%" height="50px" />
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {nftDetails ? (
                            <Link to="/author">
                              <img className="lazy" src={AuthorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          )}
                        </div>

                        <div className="author_list_info">
                          {nftDetails ? (
                            <Link to="/author">Monica Lucas</Link>
                          ) : (
                            <Skeleton width="120px" height="30px" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {nftDetails ? (
                            <Link to="/author">
                              <img
                                className="lazy"
                                src={nftDetails?.authorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                          {nftDetails ? (
                            <Link to="/author">{nftDetails?.authorId}</Link>
                          ) : (
                            <Skeleton width="120px" height="30px" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {nftDetails ? (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>1.85</span>
                      </div>
                    ) : (
                      <Skeleton width="112px" height="30px" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
