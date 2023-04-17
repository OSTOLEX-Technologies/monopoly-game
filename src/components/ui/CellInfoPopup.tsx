import styled from "styled-components";
import {Html} from "@react-three/drei";

const Background = styled.div`
  margin: auto;
  width: 300px;
  height: 450px;
  //width: 300px;
  //height: 400px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/vertical_popup.png");
  //position: absolute;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
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
  margin-right: -30px;
`;

const PopupDescription = styled.span`
  font-family: Orbitron;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
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
  margin-top: 60px;
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

interface CellInfoPopupProps {
    header: string;
    link?: string;
    description: string;
    logo?: string;
    owner?: string;

}

export function CellInfoPopup() {
    return (
        <Html position={[2.6, 1, 4]}>
            <Background>
                <CategoryContainer>
                    <CategoryImg
                        src="https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/project%20logos/Paras.png"
                        alt="category icon"
                    />
                    {/*тут иконка категории, типо игры,  DEX, т.д.*/}
                    <PopupHeaderContainer>
                        <PopupHeader>
                            Hockey Club Manager
                        </PopupHeader>
                        <PopupLink href="https://paras.id">
                            paras.id
                        </PopupLink>
                        <PopupDescription>
                            All-in-one social platform to buy, sell and create NFTs on Near
                            Protocol
                        </PopupDescription>
                    </PopupHeaderContainer>
                </CategoryContainer>
                <ProjectDataContainer>
                    <Logo
                        src="https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/project%20logos/Paras.png"
                        alt="logo"/>
                    <OwnerText>
                        tile owned by: let45fc.near{" "}
                        {/*цветом имя овнера, если нет овнера, ничего не пиши*/}
                    </OwnerText>
                    <div>
                        {/*жирным подсвечиваешь стадию проекта*/}
                        <ProjectStageText>Pre-seed commission 10</ProjectStageText>
                        <ProjectStageText>Seed commission 30</ProjectStageText>
                        <ProjectStageText>Series A commission 50</ProjectStageText>
                        <ProjectStageText>Series B commission 100</ProjectStageText>
                        <ProjectStageText>Series C commission 160</ProjectStageText>
                        <ProjectStageText>ICO 200 commission</ProjectStageText>
                    </div>
                </ProjectDataContainer>
                {/*тут тебе надо будет в цифры передавать данные из GameConfig что я писал*/}
                <GameDataContainer>
                    <GameDataUnitContainer>
                        {/*тут тоже в цифры передавать данные из GameConfig*/}
                        <GameDataUnitImage
                            src={import.meta.env.BASE_URL + "icons/House.png"}
                            alt="icon"
                        />
                        {/*серебряная монетка*/}
                        <GameDataUnitPrice>100</GameDataUnitPrice>
                    </GameDataUnitContainer>
                    <GameDataUnitContainer>
                        <GameDataUnitImage
                            src={import.meta.env.BASE_URL + "icons/Hotel.png"}
                            alt="icon"
                        />
                        {/*золотая монетка*/}
                        <GameDataUnitPrice>100</GameDataUnitPrice>
                    </GameDataUnitContainer>
                    <GameDataUnitContainer>
                        <GameDataUnitImage
                            src={import.meta.env.BASE_URL + "icons/Mortgaged.png"}
                            alt="icon"
                        />
                        {/*иконка залога, её я ещё не нарисовал*/}
                        <GameDataUnitPrice>100</GameDataUnitPrice>
                    </GameDataUnitContainer>
                </GameDataContainer>
            </Background>
        </Html>
    );
}
