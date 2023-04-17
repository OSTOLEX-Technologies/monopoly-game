import styled from "styled-components";
import {Html} from "@react-three/drei";
import {CellInfoPopupData} from "../../ReactManagers";

const Background = styled.div`
  margin: auto;
  width: 300px;
  height: 450px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${import.meta.env.BASE_URL + 'vault/vertical_popup.png'});
  position: absolute;
  transform: translate(-50%, -43%);
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 50px;
  padding-top: 20px;
`;

const CategoryImg = styled.img`
  width: 30px;
  height: 30px;
  margin-left: -15px;
  filter: invert(1);
`;

const PopupHeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-left: -15px;
  display: flex;
  flex-direction: column;
  //padding-top: 20px;
`;

const PopupHeader = styled.p`
  font-family: Orbitron;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 0;
  margin-left: 0px;
`;

const PopupDescription = styled.span`
  font-family: Orbitron;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  margin-right: -15px;
  margin-left: -15px;
`;

const PopupLink = styled.a`
  margin-top: -15px;
  text-align: center;
  color: #fff;
`;

const Logo = styled.img`
  width: 110px;
  height: 110px;
`;

const OwnerText = styled.span`
  font-family: Orbitron;
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
`;

const ProjectStageText = styled.p`
  font-family: Orbitron;
  font-size: 10px;
  color: #fff;
  text-align: center;
  margin: 1px;
`;

const ProjectDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Orbitron;
  color: #fff;
  //margin: 80px 60px;
  margin-top: 80px;
`;

const GameDataContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Orbitron;
  color: #fff;
  margin: 5px 60px;
`;

const GameDataUnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const GameDataUnitPrice = styled.span`
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
`;

const GameDataUnitImage = styled.img`
  width: 30px;
  height: 30px;
`;

interface CellInfoPopupProps extends CellInfoPopupData {
    onPointerOver: (e: any) => void;
    onPointerLeave: (e: any) => void;
}

export function CellInfoPopup(props: CellInfoPopupProps) {
    return (
        <Html position={[0, 0, 0]}>
            <Background onPointerOver={props.onPointerOver} onPointerLeave={props.onPointerLeave}>
                <CategoryContainer>
                    {
                        props.categoryImg && (
                            <CategoryImg
                                src={props.categoryImg}
                                alt="category icon"
                            />
                        )
                    }
                    <PopupHeaderContainer>
                        <PopupHeader>
                            {props.header}
                        </PopupHeader>
                        {props.link && (
                            <PopupLink href={props.link}>
                                {props.link.replace("https://", "").replace("http://", "")}
                            </PopupLink>
                        )}
                        <PopupDescription>
                            {props.description}
                        </PopupDescription>
                    </PopupHeaderContainer>
                </CategoryContainer>
                <ProjectDataContainer>
                    <Logo
                        src={props.logo}
                        alt="logo"/>
                    {
                        props.owner && (
                            <OwnerText>
                                tile owned by: {props.owner}
                            </OwnerText>
                        )
                    }
                    {
                        props.stages && (
                            <div>
                                {
                                    props.stages.map((stage, index) => (
                                        <ProjectStageText
                                            key={index}
                                            style={{
                                                fontWeight: index === props.currentStage ? "bold" : "normal"
                                            }}
                                        >
                                            {stage}
                                        </ProjectStageText>
                                    ))
                                }
                            </div>
                        )
                    }
                </ProjectDataContainer>
                {
                    props.housePrice && props.hotelPrice && props.mortgagePrice && (
                        <GameDataContainer>
                            <GameDataUnitContainer>
                                <GameDataUnitImage
                                    src={import.meta.env.BASE_URL + "icons/House.png"}
                                    alt="icon"
                                />
                                <GameDataUnitPrice>{props.hotelPrice}</GameDataUnitPrice>
                            </GameDataUnitContainer>
                            <GameDataUnitContainer>
                                <GameDataUnitImage
                                    src={import.meta.env.BASE_URL + "icons/Hotel.png"}
                                    alt="icon"
                                />
                                <GameDataUnitPrice>{props.hotelPrice}</GameDataUnitPrice>
                            </GameDataUnitContainer>
                            <GameDataUnitContainer>
                                <GameDataUnitImage
                                    src={import.meta.env.BASE_URL + "icons/Mortgaged.png"}
                                    alt="icon"
                                />
                                <GameDataUnitPrice>{props.mortgagePrice}</GameDataUnitPrice>
                            </GameDataUnitContainer>
                        </GameDataContainer>
                    )
                }
            </Background>
        </Html>
    );
}
