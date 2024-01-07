import styled from "styled-components";

interface Props {}

const OrderPage: React.FC<Props> = () => {
    return (
        <Wrapper>
            <TitleBar>
                <Title>Order Page</Title>
            </TitleBar>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 65vh;
`;

const TitleBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsl(var(--secondary));
    color: white;
    height: 150px;
`;

const Title = styled.h1`
    font-size: 40px;
`;
export default OrderPage;