
import { AiOutlineClose } from "react-icons/ai";
import AnimatedModal from "../AnimatedModal";
import { HeaderModal, MesageModal, Modal } from "./styles";

function ModalC ({
  opened,
  setOpenedModal,
  mesage
  
}) {

  function close() {
    
    setOpenedModal(false)
  }

  
    return (
      <Modal onClick={() => close()}>
        <AnimatedModal>
          <HeaderModal onClick={(e) => e.stopPropagation()}>
            <AiOutlineClose onClick={() => close()} />
          </HeaderModal>

          <MesageModal onClick={(e) => e.stopPropagation()}>{mesage}</MesageModal>
            
            
         
        </AnimatedModal>
      </Modal>
    );

}

export default ModalC;
