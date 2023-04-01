import React, { useState } from 'react';
import { Container, Image, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Room } from '../../api/room/RoomCollection';

/** Render the map of the 3rd floor of POST. */
const MapDataComponent = () => {
  const [modalToShow, setModalToShow] = useState(null);

  const handleModalClose = () => setModalToShow(null);

  const { rooms } = useTracker((selector, options) => {
    const subscription = Room.subscribe();
    const rdy = subscription.ready();
    const roomProfiles = Room.find({}, options).fetch();
    return {
      rooms: roomProfiles,
      ready: rdy,
    };
  }, []);

  const handleClick = (room) => {
    setModalToShow(room);
  };

  /** Render the map of the 3rd floor of POST. */
  return (
    <Container>
      <Image src="/images/post_3rdfloor.png" id={PAGE_IDS.MAP} useMap="#floor-map" />
      <map name="floor-map">
        <area
          target="_self"
          alt="301"
          title="301"
          onClick={() => handleClick('301')}
          href="#"
          coords="380,695,428,716"
          shape="rect"
        />
        <area
          target="_self"
          alt="302"
          title="302"
          onClick={() => handleClick('302')}
          href="#"
          coords="421,804,349,806,348,686,369,670,375,715,422,719,433,725"
          shape="poly"
        />
        <area
          target="_self"
          alt="303a"
          title="303A"
          onClick={() => handleClick('303A')}
          href="#"
          coords="345,807,269,744"
          shape="rect"
        />
        <area
          target="_self"
          alt="303b"
          title="303B"
          onClick={() => handleClick('303B')}
          href="#"
          coords="264,805,188,746"
          shape="rect"
        />
        <area
          target="_self"
          alt="303c"
          title="303C"
          onClick={() => handleClick('303C')}
          href="#"
          coords="182,807,96,746"
          shape="rect"
        />
        <area
          target="_self"
          alt="303d"
          title="303D"
          onClick={() => handleClick('303D')}
          href="#"
          coords="157,739,95,667"
          shape="rect"
        />
        <area
          target="_self"
          alt="303e"
          title="303E"
          onClick={() => handleClick('303E')}
          href="#"
          coords="153,662,98,594"
          shape="rect"
        />
        <area
          target="_self"
          alt="303f"
          title="303F"
          onClick={() => handleClick('303F')}
          href="#"
          coords="156,556,142,578,101,576,98,539,96,505,154,505"
          shape="poly"
        />
        <area
          target="_self"
          alt="303g"
          title="303G"
          onClick={() => handleClick('303G')}
          href="#"
          coords="164,499,184,482,184,451,97,448,95,497"
          shape="poly"
        />
        <area
          target="_self"
          alt="304"
          title="304"
          onClick={() => handleClick('304')}
          href="#"
          coords="237,525,191,448"
          shape="rect"
        />
        <area
          target="_self"
          alt="305A"
          title="305A"
          onClick={() => handleClick('305A')}
          href="#"
          coords="236,396,189,396,188,361,206,346,235,343"
          shape="poly"
        />
        <area
          target="_self"
          alt="305B"
          title="305B"
          onClick={() => handleClick('305B')}
          href="#"
          coords="183,394,95,396,97,347,166,345,180,361"
          shape="poly"
        />
        <area
          target="_self"
          alt="305D"
          title="305D"
          onClick={() => handleClick('305D')}
          href="#"
          coords="96,183,156,184,156,240,140,256,96,257"
          shape="poly"
        />
        <area
          target="_self"
          alt="305E"
          title="305E"
          onClick={() => handleClick('305E')}
          href="#"
          coords="141,175,96,176,96,103,155,102,157,160"
          shape="poly"
        />
        <area
          target="_self"
          alt="305F"
          title="305F"
          onClick={() => handleClick('305F')}
          href="#"
          coords="167,96,98,96,100,42,182,37,183,80"
          shape="poly"
        />
        <area
          target="_self"
          alt="306A"
          title="306A"
          onClick={() => handleClick('306A')}
          href="#"
          coords="188,104,220,103,235,122,236,175,188,175"
          shape="poly"
        />
        <area
          target="_self"
          alt="306B"
          title="306B"
          onClick={() => handleClick('306B')}
          href="#"
          coords="247,97,189,97,189,40,262,37,265,80"
          shape="poly"
        />
        <area
          target="_self"
          alt="305C"
          title="305C"
          onClick={() => handleClick('305C')}
          href="#"
          coords="96,266,154,264,157,321,140,338,97,337"
          shape="poly"
        />
        <area
          target="_self"
          alt="305G"
          title="305G"
          onClick={() => handleClick('305G')}
          href="#"
          coords="236,312,204,311,189,295,187,210,236,209"
          shape="poly"
        />
        <area
          target="_self"
          alt="306C"
          title="306C"
          onClick={() => handleClick('306C')}
          href="#"
          coords="287,95,344,96,342,37,268,39,270,80"
          shape="poly"
        />
        <area
          target="_self"
          alt="306D"
          title="306D"
          onClick={() => handleClick('306D')}
          href="#"
          coords="345,176,289,175,288,121,304,106,343,104"
          shape="poly"
        />
        <area
          target="_self"
          alt="307A"
          title="307A"
          onClick={() => handleClick('307A')}
          href="#"
          coords="350,97,407,98,425,81,423,40,348,39"
          shape="poly"
        />
        <area
          target="_self"
          alt="307B"
          title="307B"
          onClick={() => handleClick('307B')}
          href="#"
          coords="448,125,431,108,430,40,504,38,502,124"
          shape="poly"
        />
        <area
          target="_self"
          alt="307C"
          title="307C"
          onClick={() => handleClick('307C')}
          href="#"
          coords="446,129,428,147,429,180,505,177,504,130"
          shape="poly"
        />
        <area
          target="_self"
          alt="308"
          title="308"
          onClick={() => handleClick('308')}
          href="#"
          coords="511,112,571,112,574,93,590,102,608,94,612,109,613,38,512,37"
          shape="poly"
        />
        <area
          target="_self"
          alt="309A"
          title="309A"
          onClick={() => handleClick('309A')}
          href="#"
          coords="619,174,619,105,690,103,694,130,678,143,691,151,693,174"
          shape="poly"
        />
        <area
          target="_self"
          alt="309B"
          title="309B"
          onClick={() => handleClick('309B')}
          href="#"
          coords="698,101,720,81,719,40,622,40,618,91"
          shape="poly"
        />
        <area
          target="_self"
          alt="309C"
          title="309C"
          onClick={() => handleClick('309C')}
          href="#"
          coords="745,97,728,83,729,44,799,41,800,93"
          shape="poly"
        />
        <area
          target="_self"
          alt="310A"
          title="310A"
          onClick={() => handleClick('310A')}
          href="#"
          coords="855,173,805,175,804,106,836,104,853,121"
          shape="poly"
        />
        <area
          target="_self"
          alt="310B"
          title="310B"
          onClick={() => handleClick('310B')}
          href="#"
          coords="859,95,883,83,883,41,810,40,807,93"
          shape="poly"
        />
        <area
          target="_self"
          alt="310C"
          title="310C"
          onClick={() => handleClick('310C')}
          href="#"
          coords="958,97,906,100,890,82,888,40,957,40"
          shape="poly"
        />
        <area
          target="_self"
          alt="311"
          title="311"
          onClick={() => handleClick('311')}
          href="#"
          coords="1003,205,1005,128,1020,113,1033,124,1083,130,1083,234,1024,233,1022,205"
          shape="poly"
        />
        <area
          target="_self"
          alt="312A"
          title="312A"
          onClick={() => handleClick('312A')}
          href="#"
          coords="1020,239,1079,238,1082,310,1035,311,1020,295"
          shape="poly"
        />
        <area
          target="_self"
          alt="312B"
          title="312B"
          onClick={() => handleClick('312B')}
          href="#"
          coords="1077,392,997,390,993,335,1011,320,1076,319"
          shape="poly"
        />
        <area
          target="_self"
          alt="312C"
          title="312C"
          onClick={() => handleClick('312C')}
          href="#"
          coords="988,391,942,395,943,316,970,316,984,336"
          shape="poly"
        />
        <area
          target="_self"
          alt="314A"
          title="314A"
          onClick={() => handleClick('314A')}
          href="#"
          coords="1076,497,1012,499,996,483,993,451,1079,451"
          shape="poly"
        />
        <area
          target="_self"
          alt="314B"
          title="314B"
          onClick={() => handleClick('314B')}
          href="#"
          coords="1078,574,1037,578,1021,559,1022,508,1078,506"
          shape="poly"
        />
        <area
          target="_self"
          alt="314C"
          title="314C"
          onClick={() => handleClick('314C')}
          href="#"
          coords="1082,661,1020,663,1018,604,1034,587,1077,587"
          shape="poly"
        />
        <area
          target="_self"
          alt="314D"
          title="314D"
          onClick={() => handleClick('314D')}
          href="#"
          coords="1082,740,1021,741,1019,684,1037,670,1080,667"
          shape="poly"
        />
        <area
          target="_self"
          alt="314E"
          title="314E"
          onClick={() => handleClick('314E')}
          href="#"
          coords="1078,802,992,804,991,765,1011,746,1079,746"
          shape="poly"
        />
        <area
          target="_self"
          alt="314F"
          title="314F"
          onClick={() => handleClick('314F')}
          href="#"
          coords="989,807,917,807,912,748,968,747,985,762"
          shape="poly"
        />
        <area
          target="_self"
          alt="314G"
          title="314G"
          onClick={() => handleClick('314G')}
          href="#"
          coords="907,805,834,805,831,747,891,746,905,764"
          shape="poly"
        />
        <area
          target="_self"
          alt="313"
          title="313"
          onClick={() => handleClick('313')}
          href="#"
          coords="986,525,941,527,942,468,923,450,940,449,985,449"
          shape="poly"
        />
        <area
          target="_self"
          alt="314H"
          title="314H"
          onClick={() => handleClick('314H')}
          href="#"
          coords="752,747,809,746,823,762,825,801,749,804"
          shape="poly"
        />
        <area
          target="_self"
          alt="314I"
          title="314I"
          onClick={() => handleClick('314I')}
          href="#"
          coords="670,805,744,801,748,738,731,720,670,718"
          shape="poly"
        />
        <area
          target="_self"
          alt="314-1"
          title="314-1"
          onClick={() => handleClick('314-1')}
          href="#"
          coords="977,580,940,582,940,555,989,553,991,561"
          shape="poly"
        />
        <area target="_self" alt="315" title="315" href="#" coords="744,712,644,711,644,666,746,667" shape="poly" />
        <area
          target="_self"
          alt="316"
          title="316"
          onClick={() => handleClick('316')}
          href="#"
          coords="640,711,592,712,593,705,611,700,593,682,591,664,637,667"
          shape="poly"
        />
        <area
          target="_self"
          alt="317"
          title="317"
          onClick={() => handleClick('317')}
          href="#"
          coords="486,804,588,806,587,739,596,721,585,708,566,668,535,668,531,722,485,752"
          shape="poly"
        />
        <area
          target="_self"
          alt="318A"
          title="318A"
          onClick={() => handleClick('318A')}
          href="#"
          coords="295,604,531,602,513,578,508,505,473,480,468,455,298,451"
          shape="poly"
        />
        <area
          target="_self"
          alt="318B"
          title="318B"
          onClick={() => handleClick('318B')}
          href="#"
          coords="586,604,739,603,736,455,662,454,661,501,595,502"
          shape="poly"
        />
        <area
          target="_self"
          alt="319"
          title="319"
          onClick={() => handleClick('319')}
          href="#"
          coords="744,602,742,451,804,449,806,486,879,483,877,519,878,606"
          shape="poly"
        />
        <area
          target="_self"
          alt="320"
          title="320"
          onClick={() => handleClick('320')}
          href="#"
          coords="809,451,809,484,879,483,879,450"
          shape="poly"
        />
        <area
          target="_self"
          alt="321"
          title="321"
          onClick={() => handleClick('321')}
          href="#"
          coords="815,395,878,394,879,338,816,335"
          shape="poly"
        />
        <area
          target="_self"
          alt="322"
          title="322"
          onClick={() => handleClick('322')}
          href="#"
          coords="933,262,936,400,885,391,904,351,889,336,887,263"
          shape="poly"
        />
        <area
          target="_self"
          alt="323"
          title="323"
          onClick={() => handleClick('323')}
          href="#"
          coords="864,321,815,324,818,262,877,259,879,307"
          shape="poly"
        />
        <area
          target="_self"
          alt="324"
          title="324"
          onClick={() => handleClick('324')}
          href="#"
          coords="717,181,719,226,851,228,855,185"
          shape="poly"
        />
        <area
          target="_self"
          alt="325"
          title="325"
          onClick={() => handleClick('325')}
          href="#"
          coords="668,391,672,239,808,236,807,389"
          shape="poly"
        />
        <area
          target="_self"
          alt="326"
          title="326"
          onClick={() => handleClick('326')}
          href="#"
          coords="663,309,583,311,569,295,563,254,583,238,663,239"
          shape="poly"
        />
        <area
          target="_self"
          alt="327"
          title="327"
          onClick={() => handleClick('327')}
          href="#"
          coords="432,389,559,389,561,239,432,240"
          shape="poly"
        />
        <area
          target="_self"
          alt="328"
          title="328"
          onClick={() => handleClick('328')}
          href="#"
          coords="425,390,369,390,371,243,423,241"
          shape="poly"
        />
        <area
          target="_self"
          alt="329"
          title="329"
          onClick={() => handleClick('329')}
          href="#"
          coords="427,231,365,231,357,179,419,180"
          shape="poly"
        />
        <area
          target="_self"
          alt="330"
          title="330"
          onClick={() => handleClick('330')}
          href="#"
          coords="302,322,359,324,359,264,298,262"
          shape="poly"
        />
        <area
          target="_self"
          alt="331"
          title="331"
          onClick={() => handleClick('331')}
          href="#"
          coords="363,394,297,392,297,359,296,338,359,332"
          shape="poly"
        />

      </map>
      <Modal show={modalToShow !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalToShow}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content for {modalToShow} goes here.</p>
          <h3>Room Information</h3>
          <p>Building Location: {rooms.location}</p>
          <p>Description: {rooms.description}</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>Room's Resources/Equipment:</p>
          <p>Room Image: </p>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img src="https://media.gettyimages.com/id/1251629816/photo/the-perfect-setting-to-complete-work.jpg?s=612x612&w=gi&k=20&c=LEAfCAznv21Uds77_ovp-MI0DVJ5VVM-WSU897Xs71w=" alt="temporary room image" width="200px" height="200px" />
        </Modal.Body>
        <Modal.Footer>
          {/* eslint-disable-next-line react/button-has-type */}
          <button onClick={handleModalClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MapDataComponent;
