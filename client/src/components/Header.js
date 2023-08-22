import React from "react";
import MLOGO from "../images/Mlogo.svg";
import SearchBar from "./SearchBar/SearchBar";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: var(--darkGray);
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 100%;
  padding: 40px 40px;
  margin: 0 auto;
`;

export const InputForm = styled.div`
  width: 80%;
`;

export const LogoMDBFlix = styled.img`
  width: 15%;
`;

export const LogoMDBFlixSmall = styled.img`
  width: 10%;
`;

export const SmallViewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 100%;
  padding-top: 1em;
  margin: 0 auto;
  & button {
    font-size: 0.75em;
    padding: 0.5em;
  }
`;

const Header = ({
  searchTerm,
  setSearchTerm,
  setMovies,
  setSubmitted,
  showSuggestions,
  setShowSuggestions,
  autocompleted,
  setAutocompleted,
  simpleView,
  toggleSimpleView,
  searchMode,
  setSearchMode,
}) => (
  <Wrapper>
    {simpleView &&
      <>
        <div>
          <LogoMDBFlixSmall src={MLOGO} alt="mdb-logo" />
        </div>
        <SmallViewHeader>
          <button className="subbtn" onClick={toggleSimpleView}>Show Advanced Search</button>
        </SmallViewHeader>
      </>
    }
    <Content>
      {!simpleView && <LogoMDBFlix src={MLOGO} alt="mdb-logo" /> }
      <InputForm>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setMovies={setMovies}
          setSubmitted={setSubmitted}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          autocompleted={autocompleted}
          setAutocompleted={setAutocompleted}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
        />
      </InputForm>
    </Content>
  </Wrapper>
);

export default Header;
