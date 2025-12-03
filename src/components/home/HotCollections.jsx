import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleSlider from "./SimpleSlider";
import Skeleton from "../UI/Skeleton.jsx";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data || []);
  }

  function renderHotCollections() {
    return hotCollections.map((element) => (
      <div key={element.id} className="collection">
        <>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${element.nftId}`}>
                {hotCollections?.length > 0 ? (
                  <img
                    src={element.nftImage}
                    className="lazy img-fluid"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                {hotCollections?.length > 0 ? (
                  <img
                    className="lazy pp-coll"
                    src={element.authorImage}
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="60px" borderRadius="50%" />
                )}
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                {hotCollections?.length > 0 ? (
                  <h4>{element.title}</h4>
                ) : (
                  <Skeleton width="45%" height="24px" borderRadius="5px" />
                )}
              </Link>
              {hotCollections?.length > 0 ? (
                <span>ERC-{element.code}</span>
              ) : (
                <Skeleton width="25%" height="24px" borderRadius="5px" />
              )}
            </div>
          </div>
        </>
      </div>
    ));
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <SimpleSlider itemsArray={hotCollections} renderFunction={renderHotCollections()} />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
