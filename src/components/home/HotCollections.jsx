import React, { useEffect, useState } from "react";
import axios from "axios";
import SimpleSlider from "./SimpleSlider";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data || []);
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

          <SimpleSlider hotCollections={hotCollections} />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
