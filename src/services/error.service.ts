import { Injectable } from "@angular/core";

import { InteractionService } from "./interaction.service";

@Injectable()
export class ErrorService {

  constructor(
    private uiService: InteractionService
  ) {}

  /**
   * Present toast with error.
   * @param exeption {Error}
   */
  handleError(exeption) {
    this.uiService.presentToast(exeption.message)
  }
}

/**
 * List of error
 */
export const ErrorList = {
  STANDARD_ERR: "Une erreur est survenue !",
  EXTENSION_FILE_ERR: "Impossible d'importer le fichier, seule les fichiers '.his' sont autorisés.",
  CANNOT_READ_FILE_ERR: "Impossible de lire le fichier..."
}