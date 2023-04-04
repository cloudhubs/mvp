import { useEffect, useCallback, useState } from "react";
import myData from '../data/communicationGraph.json';

export const useInfoBoxLink = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");
    const [links, setLinks] = useState([])

    const handleLinkClick = useCallback(
        (event: any) => {
          setAnchorPoint({ x: event.pageX, y: event.pageY });
          setSource(event.detail.link.source.nodeName);
          setTarget(event.detail.link.target.nodeName);
          setLinks(event.detail.link.requests);
          setShow(true);
        },
        [setShow, setAnchorPoint]
    );


    useEffect(() => {
        document.addEventListener("linkClick", handleLinkClick);
        return () => {
            document.removeEventListener("linkClick", handleLinkClick);
        };
    });
    return {
      source,
      target,
      links,
      show,
      anchorPoint,
      setShow
    };
};