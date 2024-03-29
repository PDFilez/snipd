import React from "react";
import { Card, Text, Anchor} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { deleteSnipd, moveSnipdDown, moveSnipdUp } from "../utils/snipUtils";
import ItemHeader from "./ItemHeader";
import { Spoiler } from "@mantine/core";
import "../styles/SnippetStyles.css";


export function Snippet(props) {
  const { hovered, ref } = useHover();

  const handleSourceButtonClick = () => {
    window.location.href = props.snip.source;
  };

  return (
    <div className="snippet-container" ref={ref}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <ItemHeader
          type={props.snip.type}
          title={props.snip.title}
          date={props.snip.date}
          source={props.snip.source}
          hovered={hovered}
          onSourceClick={handleSourceButtonClick}
          onUpClick={() => moveSnipdUp(props.index).then(props.refetch)}
          onDeleteClick={() => deleteSnipd(props.index).then(props.refetch)}
          onDownClick={() => moveSnipdDown(props.index).then(props.refetch)}
        />
        <div style={{ display: "flex", width: "100%" }}>
          
          {props.snip.type === "image" && (
            <Card className="text-content">
              <div className="image-div">
                <img className="image-container" src={props.snip.content} />
              </div>
            </Card>
          )}
          {(props.snip.type === "text" || props.snip.type === "note") && (
            <Card className="text-content">
              <Spoiler
                maxHeight={90}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={100}>
                <Text className="text-container" size="sm" color="dimmed">
                  {props.snip.content}
                </Text>
              </Spoiler>
            </Card>
          )}
          {props.snip.type === "link" && (
            <Card className="link-content">
              <div className="link-container">
                <Anchor variant="gradient" className="link-anchor" href={props.snip.content}>
                  {props.snip.content}
                </Anchor>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
